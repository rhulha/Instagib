# Instagib
Instagib game using WebGL, Dart and Q3DM17 - The Longest Yard

## Introduction

This is a project written in [Dart](https://www.dartlang.org/) trying to bring the frantic instagib gameplay from the Quake 3 map The Longest Yard (q3dm17) to the web.

It is a work in progress and NOT finished yet!

Here is a playable alpha: https://rhulha.github.io/Instagib/


## Motivation
In a way this project is the culmination of my life's passion.
I have been a fan of John Carmack ever since I played Quake 1.
With the release of Quake 3 I finally started getting into mod making having been a fan and player of many Quake 2 mods myself.
My first dip into the water resulted in me writing a tutorial on [weapon dropping for planetquake/code3arena](https://www.quakewiki.net/archives/code3arena/tutorials/tutorial22.shtml) 17 years ago.
Then I got a gig on a mod team trying to create a realistic shooter.
We didn't finish our work, but I learned a lot about teamwork.
In the end I went on to write two mods alone, one where you had to buy your weapons for frags and one where all players would hunt one very powerful player, which got featured on an italian game magazine disc.
My love for quake 3 has never wavered and ever since I learned about WebGL I wanted to try to port the instagib gameplay to the web.

## Screenshots
![q3dm17](https://i.imgur.com/wu7xEVM.png)

## Tech/framework used
* [Dart](https://www.dartlang.org/)
* [WebGL 1.0](https://www.khronos.org/registry/webgl/specs/1.0/)
* [ChronosGL 1.X](https://github.com/ChronosTeam/ChronosGL)
* [Quake 3 source code](https://github.com/id-Software/Quake-III-Arena)

## Features
* browser based gaming
* textureless TRON inspired render style
* BSP and MD3 processing
* curved surfaces collision detection

## Installation / How to use
No installation needed, just point your browser to: https://rhulha.github.io/Instagib/

## Bugs
* The middle jump pad gets you stuck many times
* If you jump against a ceiling you get stuck
* If you have an idea why this is happening I would appreciate you opening [an issue](https://github.com/rhulha/Instagib/issues/new): 

## Missing features / TODOs
* Model rendering (MD3)
* teleporter
* Networking (using WebSockets)
* matchmaking
* test if strafe jumping works as expected

## Issues / Bug reports
Ensure the bug was not already reported by searching on GitHub under [issues](https://github.com/rhulha/Instagib/issues). If you're unable to find an open issue addressing the bug, open a [new issue](https://github.com/rhulha/Instagib/issues/new).

### Please write detailed information
Detailed information is very helpful to understand an issue.

For example:
* How to reproduce the issue, step-by-step.
* The expected behavior (or what is wrong).
* Screenshots for GUI issues.
* The operating system.


## Contribute / Pull Requests
Pull Requests are always welcome. 

## Credits
* The man, the legend: [John Carmack](https://twitter.com/id_aa_carmack)
* [Brandon Jones (Toji)](http://blog.tojicode.com/) for his awesome [q3tourney2 demo](http://media.tojicode.com/q3bsp/) which helped me getting started a ton.
* Kekoa Proudfoot (Mr Alligator) for his excellent [Quake 3 map specs document](http://www.mralligator.com/q3/). (I recommend to read the q3 source code regarding map loading, right after reading Kekoa's specs)

## License
GPL v2 (Same as the Quake3 source code)

