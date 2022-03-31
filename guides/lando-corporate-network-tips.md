# Lando in Corporate Network Environments

Many large organizations have proxy services, SSL decryption, and other network settings that can interfere with how Docker and Lando operate. In this guide we try to collect some common issues with using Lando in such contexts.

## SSL Decryption

SSL decryption is basically an "authorized" man-in-the-middle attack that is allowed to happen when an intermediate network device (i.e. the SSL decryptor) can intercept all of your requests and pose as the destination server to your local network client. Due to the security precautions in the SSL/TLS protocol, this only works if your network client trusts the certificate that is used by the decryption device. We've most commonly seen SSL Decryption used with ZScaler.

If you're missing the cert from your SSL decryptor, you'll likely see one of the following errors like:

```
Error: unable to get local issuer certificate
```

```
curl: (60) SSL certificate problem: unable to get local issuer certificate
More details here: http://curl.haxx.se/docs/sslcerts.html
```

If you experience a `request to undefined failed with code 200: undefined.` error when running a `lando init` command and trying to connect with a 3rd-party hosting service like Pantheon, this may also be your root issue.

Here are the basic steps to enable Lando to work inside such a network environment:


### Retrieve Your Cert

Obtain the certificate(s) of the decryption device in base64 encoded format. Your organization's IT or networking department should be able to provide them to you as they most likely are already importing them into the Windows trusted certificate store so that Windows and other programs like your internet browser will work. Alternatively, you can export them using your internet browser. Go to any website and click the padlock icon next to the site's URL and inspect the certificate. You should find that it's a custom certificate belonging to your organization's decryption device and not the certificate belonging to the actual website you're visiting. There should be an option to export or save the certificate. View the certification path as there may be more than one certificate you need to export. (In our case, we have a custom root certificate authority as well as an intermediary certificate.)

### Add Cert to Host Environment

If Lando is experiencing errors before an application is started (IE, before any Docker containers are running for your project), then it's likely that either Node or another service on your host machine doesn't have access to the decryption device's cert.

Make sure that NodeJS has access to the cert:

```
export NODE_EXTRA_CA_CERTS=/location/of/yourcert.crt
```

This can also happen if you're running Windows with WSL, in which case you'll need to install the certs in the WSL Linux distro so that various commands like git can access the internet. Run these commands in your directory containing your certificates, replacing `yourcert.crt` with the name of your certificates:

```
sudo su
cp yourcert.crt /usr/local/share/ca-certificates/
update-ca-certificates
```

Note the location of the certs may change depending on your Linux distribution.

### Add Cert to Lando Containers

Once Lando is running, there are a number of cases where code running inside Lando's containers may need to have the certs installed as well. To do this, first **store the certificates somewhere in your Lando project directory.** We just put them in our project's root directory, so within the container the cert is available at `/app/yourcert.crt`.
  
#### Adding Certs to an Appserver Container

Add this to your project's `.lando.yml`, replacing `yourcert.crt` with the name of your certificates:

```
services:
  appserver:
    build_as_root:
      - sed 's|mozilla\/AddTrust_External_Root.crt|#mozilla\/AddTrust_External_Root.crt|g' -i /etc/ca-certificates.conf
      - /bin/sh -c "cp /app/yourcert.crt /usr/local/share/ca-certificates/"
      - update-ca-certificates
```

#### Adding Certs for PHP cURL Requests
If you make external requests with the PHP process in your app, you will probably receive an also need to include the cert in your appserver's `php.ini` file:

```
services:
  appserver:
    ## Use a custom php.ini to instruct curl and openssl to use the ca-all.pem, which includes the Zscaler cert.
    config:
      php: .lando/config/php.ini
```

Add these two lines to `php.ini` to reference your cert:

```
curl.cainfo='/path/to/your/cert.pem'
openssl.cafile='/path/to/your/cert.pem'
```

#### Adding Certs to a NodeJS Service
If you have a Node server in your Lando environment, you'll need to concatenate your certificates into a single .pem file and add this to your Node configuration:

```
node:
    type: node
    overrides:
      environment:
        NODE_EXTRA_CA_CERTS: /app/cop_ca.pem
```

Finally, run `lando rebuild` to rebuild all of the services you added the certs. Hopefully you should be able to access the internet through your network decryption device!

