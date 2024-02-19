---
title: Installation
description: Redirect for install instructions
---

<script setup>
import {UAParser} from 'ua-parser-js';

const parser = new UAParser();
const os = parser.getOS();

// # List of possible values for `os.name`
// AIX, Amiga OS, Android[-x86], Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS,
// Contiki, Fedora, Firefox OS, FreeBSD, Debian, Deepin, DragonFly, elementary OS,
// Fuchsia, Gentoo, GhostBSD, GNU, Haiku, HarmonyOS, HP-UX, Hurd, iOS, Joli, KaiOS,
// Linpus, Linspire,Linux, Mac OS, Maemo, Mageia, Mandriva, Manjaro, MeeGo, Minix,
// Mint, Morph OS, NetBSD, NetRange, NetTV, Nintendo, OpenBSD, OpenVMS, OS/2, Palm,
// PC-BSD, PCLinuxOS, Plan9, PlayStation, QNX, Raspbian, RedHat, RIM Tablet OS,
// RISC OS, Sabayon, Sailfish, SerenityOS, Series40, Slackware, Solaris, SUSE, Symbian,
// Tizen, Ubuntu, Unix, VectorLinux, Viera, watchOS, WebOS, Windows [Phone/Mobile],
// Zenwalk, ...
// https://docs.uaparser.js.org/v2/api/ua-parser-js/get-os.html
if (!import.meta.env.SSR) {
  switch (os.name) {
    case 'Mac OS':
    case 'iOS':
    case 'watchOS':
      window.location.assign('https://docs.lando.dev/install/macos');
      break;
    case 'Windows':
    case 'Windows Phone':
    case 'Windows Mobile':
      window.location.assign('https://docs.lando.dev/install/windows');
      break;
    default:
      window.location.assign('https://docs.lando.dev/install/linux');
  };
}

</script>
