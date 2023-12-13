import { useEffect, useState } from "react";
import { getTenHighestRatedGames } from "../../../firebaseFunctions";
import GameCard from "../layout/GameCard";

function HighestRatedGames() {
  // TODO remove hard coded games and replace with api call
  const [games, setGames] = useState(
    [
      {
          "pageNumber": 15,
          "releaseDate": "2017-10-27",
          "backgroundImage": "https://media.rawg.io/media/games/267/267bd0dbc496f52692487d07d014c061.jpg",
          "rawgId": 28026,
          "tags": [
              "Singleplayer",
              "Local Multiplayer",
              "exclusive",
              "Family Friendly",
              "Cute",
              "true exclusive",
              "3D Platformer",
              "Cult Classic",
              "kids"
          ],
          "genres": [
              "Arcade",
              "Platformer"
          ],
          "screenshots": [
              "https://media.rawg.io/media/games/267/267bd0dbc496f52692487d07d014c061.jpg",
              "https://media.rawg.io/media/screenshots/a38/a38e8c2161eb6c3c233b0488a3c2d5f1.jpg",
              "https://media.rawg.io/media/screenshots/ff8/ff80f35e3301fa9c0027d9f021c24340.jpg",
              "https://media.rawg.io/media/screenshots/82c/82ce6aa4915756bd39cd1e6a02e17a77.jpg",
              "https://media.rawg.io/media/screenshots/28b/28bb29070fce9fc1e45900aaebe83b2a.jpg",
              "https://media.rawg.io/media/screenshots/014/014e53bf0f33afc3a0d0fcfaa2715f73.jpg",
              "https://media.rawg.io/media/screenshots/02d/02d7425ce977a7a556beadbac4a2ae63.jpg"
          ],
          "description": "<p>Super Mario Odyssey is a 3D platform game, a part of Nintendo’s Super Mario series. </p>\n<h3>Story</h3>\n<p>The game follows Mario on his quest to save Princess Peach from her forced marriage with Bowser. The game starts with Mario fighting Bowser on its aircraft. Bowers knock Mario off the ship and shreds his cap into pieces. Mario awakens in the Cap Kingdom inhabited with hat-like spirits and befriends one of them named Cappy. It turns out, Bowser also kidnapped Cappy’s sister Tiara, and now the heroes must chase Bowser through several kingdoms to save Peach and Tiara. </p>\n<h3>Gameplay</h3>\n<p>The gameplay of Super Mario Odyssey draws inspiration from Super Mario 64 and Super Mario Sunshine. The game consists 17 levels (named as “kingdoms”). In most of them, your goal is to collect a certain amount of Power Moons. Collecting enough of them allows the player to progress to the next kingdom. Some moons can be found in different parts of the level or acquired as a reward for completing certain tasks or challenges. The Mario’s moveset mostly resembles that of Super Mario 64 and includes wall jumps, triple jumps, somersaults, long jumps, rolling on the ground. The main new gameplay feature is that Mario can throw his hat to create temporary platforms, grab objects, attack enemies, or possess them. Possessing enemies gives you new moves and sometimes is necessary to reach certain parts of the level.</p>",
          "esrbRating": "Everyone 10+",
          "metacriticScore": 97,
          "id": "ef6658d7-c515-442b-9429-927a593a6bd6",
          "platforms": [
              "Nintendo Switch"
          ],
          "name": "Super Mario Odyssey",
          "website": "https://www.nintendo.com/games/detail/super-mario-odyssey-switch"
      },
      {
          "id": "a51d98b1-ec71-4433-9be3-2d9fc5789e6e",
          "name": "The Legend of Zelda: Breath of the Wild",
          "website": "https://www.nintendo.com/games/detail/the-legend-of-zelda-breath-of-the-wild-switch",
          "description": "<p>The Legend of Zelda: Breath of the Wild is an adventure game developed by Nintendo. It is the nineteenth installment in the series.</p>\n<p>After awakening from a hundred year sleep, memoryless Link hears a mysterious female voice that guides him to a destroyed kingdom of Hyrule. He finds a Wiseman who says that a ruthless creature, Calamity Ganon, was imprisoned for 100 years. Even though the creature is trapped, it is still gaining power. Link sets out to kill Ganon before he frees himself and destroys the world.</p>\n<p>In contrast to the previous titles in the series, Breath of the Wild the player to explore a vast open world. At the beginning of the game, a small tutorial is given to the players and they are free to travel the world at the pace they see fit. Link can climb almost every surface in the world, cook food to restore health. Fast travel to certain places in the world is also available for the players. The world is highly interactive thanks to the chemistry engine.</p>",
          "screenshots": [
              "https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
              "https://media.rawg.io/media/screenshots/3c4/3c4a8f6b1994def75e73e1cb64624e7f.jpg",
              "https://media.rawg.io/media/screenshots/8f5/8f5d4264b12090bb7aa5626fcfb5be18.jpg",
              "https://media.rawg.io/media/screenshots/b77/b771adc0585c655f8a747d3160e5325a.jpg",
              "https://media.rawg.io/media/screenshots/ef7/ef7d89471e5c0dc5553c249b2c34d9cd.jpg",
              "https://media.rawg.io/media/screenshots/1e5/1e58e8a064da6906f09dba1edb3fdea6.jpg",
              "https://media.rawg.io/media/screenshots/bef/bef44f5547b97d44c5e14f8773f9876c.jpg"
          ],
          "metacriticScore": 97,
          "genres": [
              "Action",
              "Adventure",
              "RPG"
          ],
          "tags": [
              "RPG",
              "Open World",
              "Sandbox",
              "Action-Adventure",
              "exclusive"
          ],
          "rawgId": 22511,
          "pageNumber": 7,
          "esrbRating": "Everyone 10+",
          "platforms": [
              "Nintendo Switch",
              "Wii U"
          ],
          "backgroundImage": "https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
          "releaseDate": "2017-03-03"
      },
      {
          "backgroundImage": "https://media.rawg.io/media/games/74b/74b239f6ef0216a2f66e652d54abb2e6.jpg",
          "id": "fbacbd42-80f5-4f4b-ad85-4179935ae2bd",
          "screenshots": [
              "https://media.rawg.io/media/games/74b/74b239f6ef0216a2f66e652d54abb2e6.jpg",
              "https://media.rawg.io/media/screenshots/c2a/c2a483758a22707799fec207a78d552f.jpg",
              "https://media.rawg.io/media/screenshots/a93/a93fcf9216cd814573dc4aa5ea3a80c8.jpg",
              "https://media.rawg.io/media/screenshots/51d/51d4bb10e5a9ff7111e6e40a9687aee5.jpg",
              "https://media.rawg.io/media/screenshots/503/5030d91eac59ab5b28eb6bdb7e41313c.jpg",
              "https://media.rawg.io/media/screenshots/442/4429d068cd37c213e40bb83fe9b7c65c.jpg",
              "https://media.rawg.io/media/screenshots/366/366cb6c21d945376b185d4b2d94a59c2.jpg"
          ],
          "pageNumber": 14,
          "esrbRating": "Teen",
          "platforms": [
              "PlayStation 4",
              "PlayStation 3"
          ],
          "metacriticScore": 96,
          "website": "http://www.unchartedps3.com",
          "tags": [
              "Story"
          ],
          "genres": [
              "Action",
              "Shooter",
              "Adventure"
          ],
          "rawgId": 22513,
          "name": "Uncharted 2: Among Thieves",
          "description": "<p>In Uncharted 2, as in the other Uncharted games, the hero is the adventurer and hidden treasure seeker Nathan Drake. Riddles are no less important part of the gameplay than fights, chases and travels through exotic landscapes and hard-to-reach places.<br />\nDrake is well prepared for all this. He is provided with ammunition - he picks them up from the corpses of killed enemies, ably uses shelters, can run, climb, jump, kill with one blow and fight in hand-to-hand combat.<br />\nIn Uncharted 2 you can find 101 treasures. Some treasures lie almost in sight, others will have to run. Treasures can be sold, and money can be spent on bonus content. Multiplayer mode allows you to play up to 3 people at a time - this is if players follow the adventure story of the game and solve problems together. There are also battle modes, where up to 10 people can participate simultaneously. There are several combat modes, they differ in their objectives and in some ways.</p>",
          "releaseDate": "2009-10-13"
      },
      {
          "releaseDate": "2004-11-16",
          "metacriticScore": 96,
          "website": "http://www.half-life2.com",
          "name": "Half-Life 2",
          "id": "cf0529c1-d935-4d72-92b3-f8602e749703",
          "screenshots": [
              "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
              "https://media.rawg.io/media/screenshots/8af/8af6188357426890cbc8c8a34d9e7b75.jpg",
              "https://media.rawg.io/media/screenshots/3b5/3b542c954ba5bd2f32da067c8122cd80.jpg",
              "https://media.rawg.io/media/screenshots/3d6/3d6066e45d259d2e83bf6767e6113d94.jpg",
              "https://media.rawg.io/media/screenshots/e49/e49327df2404df6c5dafa8eac7990852.jpg",
              "https://media.rawg.io/media/screenshots/5dd/5dd3e53131bbfe6278bd15b9abe261a0.jpg",
              "https://media.rawg.io/media/screenshots/e99/e995e154d4f9e2df0367adea528a72c5.jpg"
          ],
          "backgroundImage": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
          "esrbRating": "Mature",
          "tags": [
              "Singleplayer",
              "Steam Achievements",
              "Multiplayer",
              "Steam Cloud",
              "Atmospheric",
              "steam-trading-cards",
              "Great Soundtrack",
              "Story Rich",
              "First-Person",
              "Sci-fi",
              "Partial Controller Support",
              "Horror",
              "FPS",
              "Classic",
              "Zombies",
              "Moddable",
              "Captions available",
              "Physics",
              "Aliens",
              "Dystopian",
              "Includes Source SDK",
              "Silent Protagonist",
              "vr mod"
          ],
          "genres": [
              "Action",
              "Shooter"
          ],
          "pageNumber": 1,
          "platforms": [
              "PC",
              "macOS",
              "Xbox 360",
              "Linux",
              "Xbox",
              "Android"
          ],
          "rawgId": 13537,
          "description": "<p>Gordon Freeman became the most popular nameless and voiceless protagonist in gaming history. He is painted as the most famous scientist and a hero within the world of Half-Life, and for a good reason. In the first game he saved the planet from alien invasion, this time, when the invasion is already begun, the world needs his help one more time. And you, as a player, will help this world to survive. This time Gordon arrives in City 17, ravaged and occupied by Combines, where he meets his old Black Mesa friends. <br />\nWhat is different, aside from the overall design quality, is the use of Valve’s Source engine that not only expands on the fluidity of character model animations and movement but allows players to interact with a myriad of objects with the advanced and realistic (to an extent) physics. Classic Headcrab Zombies are revamped and have new variants that provide players with different threats. For a story-driven FPS, Half-Life 2 is unique in its plot delivery, and making in-game mechanics feel natural, be it platforming or driving.</p>"
      },
      {
          "rawgId": 18080,
          "releaseDate": "1998-11-08",
          "pageNumber": 2,
          "backgroundImage": "https://media.rawg.io/media/games/6c5/6c55e22185876626881b76c11922b073.jpg",
          "name": "Half-Life",
          "esrbRating": "Mature",
          "website": "https://www.half-life.com/en/halflife",
          "tags": [
              "Singleplayer",
              "Multiplayer",
              "Atmospheric",
              "Great Soundtrack",
              "Story Rich",
              "First-Person",
              "Sci-fi",
              "FPS",
              "Funny",
              "Difficult",
              "Classic",
              "Retro",
              "Moddable",
              "Aliens",
              "Valve Anti-Cheat enabled",
              "1990's",
              "Linear",
              "Silent Protagonist",
              "vr mod"
          ],
          "genres": [
              "Action",
              "Shooter"
          ],
          "screenshots": [
              "https://media.rawg.io/media/games/6c5/6c55e22185876626881b76c11922b073.jpg",
              "https://media.rawg.io/media/screenshots/345/3458269ae8ea44a6b8c8268d39fe36a1.jpg",
              "https://media.rawg.io/media/screenshots/3c5/3c55c835054009de798c0a9fa886ef8b.jpg",
              "https://media.rawg.io/media/screenshots/700/70005f6c84708d988a287d406cbb038c.jpg",
              "https://media.rawg.io/media/screenshots/755/755a2b42257cf09c7f37e902dfa08400.jpg",
              "https://media.rawg.io/media/screenshots/921/9213ce16eba80f51b3562a3e5d322e02.jpg",
              "https://media.rawg.io/media/screenshots/948/948de39d02c1f08c8c98fa10e69e87af.jpg"
          ],
          "id": "a9a31dcf-06dc-4f3b-8c97-03af5232c474",
          "description": "<p>Half-Life is the original game in the series. Being a revolutionary at the time, we follow the story of Gordon Freeman - a silent scientist at the facility called Black Mesa. Arriving late at work and hastily doing his routine he runs into the experiment field. However, the experiment goes completely wrong and opens a portal to a completely different dimension called Xen. The laboratory is destroyed as well as the facility itself, as unknown creatures like Vortigaunts are now everywhere in the facility. Gordon must battle his way to the surface and find a way to close the portal.</p>\n<p>One of the main features of Half-Life was story-telling through scripted sequences within the actual gameplay. Without having cutscenes, the game was able to tell the full story of the game by showing scripted deaths, dialogues, character appearance while the gameplay was moving one. By not ripping off the player from the process, the game feels much more smooth as it continues. Despite his science nature, Gordon is masterfully using his weapons and destroys any enemy at his path with rifles, grenades, shotguns and much more.</p>",
          "platforms": [
              "Dreamcast",
              "Linux",
              "macOS",
              "PC",
              "PlayStation 2"
          ],
          "metacriticScore": 96
      },
      {
          "id": "a2dae699-ac84-41df-8c1e-a9ead7086da4",
          "esrbRating": "Mature",
          "rawgId": 4286,
          "metacriticScore": 96,
          "name": "BioShock",
          "backgroundImage": "https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg",
          "tags": [
              "Singleplayer",
              "Atmospheric",
              "Great Soundtrack",
              "RPG",
              "Story Rich",
              "First-Person",
              "Sci-fi",
              "Partial Controller Support",
              "Horror",
              "FPS",
              "Classic",
              "Action RPG",
              "Dark",
              "Dystopian",
              "Steampunk",
              "Alternate History",
              "Political",
              "Underwater"
          ],
          "platforms": [
              "PlayStation 3",
              "macOS",
              "PC",
              "Xbox 360"
          ],
          "description": "<p>FPS with RPG elements, Bioshock invites players to experience horrors of underwater isolation in the city of Rapture, the failed project of the better future. After surviving the plane crash, the protagonist has only one way to go – to the giant lighthouse that opens a way to the underwater utopia. Players will have to unravel the complicated history of Rapture, relying only on themselves, their guns and Plasmids, a mystical substance, that allows it’s user to obtain near magical abilities.<br />\nThe atmosphere of isolation and threat is conveyed through the environmental sounds, subtle electrical buzzing and audio logs, telling the story of societal decay and despair. Players will shape the story, making moral choices along their way, saving Little Sisters or extracting ADAM, the mystical fuel for your abilities. While exploring the underwater city, players will complete missions for the last sane inhabitants of Rapture, while fending off the less fortunate ones.</p>",
          "genres": [
              "Action",
              "Shooter"
          ],
          "website": "https://2k.com/en-US/game/bioshock/",
          "releaseDate": "2007-08-21",
          "pageNumber": 1,
          "screenshots": [
              "https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg",
              "https://media.rawg.io/media/screenshots/01f/01f62d7064838a5c3202acfc61503487.jpg",
              "https://media.rawg.io/media/screenshots/7f5/7f517e07e36e4af5a7c0b86a7d42853f.jpg",
              "https://media.rawg.io/media/screenshots/aca/aca089b963a42ec4cbf56b5e5334af8e.jpg",
              "https://media.rawg.io/media/screenshots/3aa/3aa6f71eba1d64e671bd45826ca96560.jpg",
              "https://media.rawg.io/media/screenshots/d8e/d8ed29c7c0b41e4013588847944ed446.jpg",
              "https://media.rawg.io/media/screenshots/146/146e418797aca19296f90d259207414c.jpg"
          ]
      },
      {
          "backgroundImage": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
          "rawgId": 28,
          "screenshots": [
              "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
              "https://media.rawg.io/media/screenshots/7b8/7b8895a23e8ca0dbd9e1ba24696579d9.jpg",
              "https://media.rawg.io/media/screenshots/b8c/b8cee381079d58b981594ede46a3d6ca.jpg",
              "https://media.rawg.io/media/screenshots/fd6/fd6e41d4c30c098158568aef32dfed35.jpg",
              "https://media.rawg.io/media/screenshots/2ed/2ed3b2791b3bbed6b98bf362694aeb73.jpg",
              "https://media.rawg.io/media/screenshots/857/8573b9f4f06a0c112d6e39cdf3544881.jpg",
              "https://media.rawg.io/media/screenshots/985/985e3e1f1d1af1ab0797d43a95d472cc.jpg"
          ],
          "esrbRating": "Mature",
          "website": "https://www.rockstargames.com/reddeadredemption2/",
          "platforms": [
              "PC",
              "PlayStation 4",
              "Xbox One"
          ],
          "id": "14a2608a-2dbe-4733-833f-7f892cd90ae9",
          "metacriticScore": 96,
          "description": "<p>America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs. Those who will not surrender or succumb are killed. </p>\n<p>After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.</p>\n<p>From the creators of Grand Theft Auto V and Red Dead Redemption, Red Dead Redemption 2 is an epic tale of life in America at the dawn of the modern age.</p>",
          "tags": [
              "Singleplayer",
              "Multiplayer",
              "Atmospheric",
              "Great Soundtrack",
              "Co-op",
              "Story Rich",
              "Open World",
              "First-Person",
              "Third Person",
              "Partial Controller Support",
              "FPS",
              "Online Co-Op",
              "Gore",
              "Exploration",
              "Sandbox",
              "Violent",
              "Third-Person Shooter",
              "PvP",
              "In-App Purchases",
              "Mature",
              "Historical",
              "Cinematic",
              "Realistic",
              "Crime",
              "Online PvP",
              "3rd-Person Perspective",
              "Blood",
              "America",
              "Masterpiece",
              "Beautiful",
              "Hunting",
              "Western",
              "3rd-person"
          ],
          "releaseDate": "2018-10-26",
          "name": "Red Dead Redemption 2",
          "pageNumber": 1,
          "genres": [
              "Action",
              "Adventure"
          ]
      },
      {
          "metacriticScore": 95,
          "screenshots": [
              "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg",
              "https://media.rawg.io/media/screenshots/07f/07f7cf80741ff306e4eca982c3e64ac8.jpg",
              "https://media.rawg.io/media/screenshots/fef/fefd51ec13aa33acbd796ef79bcef7cb.jpg",
              "https://media.rawg.io/media/screenshots/b78/b78ffd258d5793be704c380e572748bc.jpg",
              "https://media.rawg.io/media/screenshots/17c/17c85ab9dfc4fda8e1e5ba72932ef2bf.jpg",
              "https://media.rawg.io/media/screenshots/a12/a12ca99cc74c1e7eba7100b0891dd1e0.jpg",
              "https://media.rawg.io/media/screenshots/b25/b254f9729ae3f36a9ccffccaa01d5cf6.jpg"
          ],
          "tags": [
              "Singleplayer",
              "Multiplayer",
              "Atmospheric",
              "Co-op",
              "Open World",
              "cooperative",
              "Third Person",
              "Partial Controller Support",
              "Funny",
              "Gore",
              "Classic",
              "Sandbox",
              "Third-Person Shooter",
              "Moddable",
              "Crime",
              "Dark Humor",
              "Satire",
              "first person mod",
              "Bowling"
          ],
          "backgroundImage": "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg",
          "name": "Grand Theft Auto IV",
          "genres": [
              "Action",
              "Adventure"
          ],
          "releaseDate": "2008-04-29",
          "id": "a8ff0703-88cf-492c-8e0b-194cdc409d03",
          "platforms": [
              "Xbox 360",
              "PlayStation 3",
              "Xbox One",
              "PC"
          ],
          "pageNumber": 1,
          "esrbRating": "Mature",
          "rawgId": 4459,
          "website": "http://www.rockstargames.com/iv",
          "description": "<p>Every crime story is a story of a search for success. The player will become Niko Bellic, immigrant arriving at the Liberty City to reunite with his cousin Roman and find the man that betrayed him and his army unit fifteen years prior to the events of the game. While protecting his cousin, Niko has to deal with loan sharks, Russian mobsters, and other gangs. After the third game, GTA brought more realism to the player, in order to make the city and its people look more believable. Street vendors on every corner will sell food that replenishes health, bars with playable dart boards, bowling alleys and even comedy clubs and movie theatres. Open world will allow players not only hang out with important NPC in order to receive bonuses and unlocks but taking girls on the dates as well, to help Niko settle. Multiplayer mode allows up to 32 players to explore the copy of the single-player city and initiate multiplayer activities, like races or Deathmatches.</p>"
      },
      {
          "backgroundImage": "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
          "pageNumber": 1,
          "website": "http://www.thinkwithportals.com/",
          "screenshots": [
              "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
              "https://media.rawg.io/media/screenshots/221/221a03c11e5ff9f765d62f60d4b4cbf5.jpg",
              "https://media.rawg.io/media/screenshots/173/1737ff43c14f40294011a209b1012875.jpg",
              "https://media.rawg.io/media/screenshots/b11/b11a2ae0664f0e8a1ef2346f99df26e1.jpg",
              "https://media.rawg.io/media/screenshots/9b1/9b107a790909b31918ebe2f40547cc85.jpg",
              "https://media.rawg.io/media/screenshots/d05/d058fc7f7fa6128916c311eb14267fed.jpg",
              "https://media.rawg.io/media/screenshots/415/41543dcc12dffc8e97d85a56ad42cda8.jpg"
          ],
          "metacriticScore": 95,
          "rawgId": 4200,
          "name": "Portal 2",
          "description": "<p>Portal 2 is a first-person puzzle game developed by Valve Corporation and released on April 19, 2011 on Steam, PS3 and Xbox 360. It was published by Valve Corporation in digital form and by Electronic Arts in physical form. </p>\n<p>Its plot directly follows the first game&#39;s, taking place in the Half-Life universe. You play as Chell, a test subject in a research facility formerly ran by the company Aperture Science, but taken over by an evil AI that turned upon its creators, GladOS. After defeating GladOS at the end of the first game but failing to escape the facility, Chell is woken up from a stasis chamber by an AI personality core, Wheatley, as the unkempt complex is falling apart. As the two attempt to navigate through the ruins and escape, they stumble upon GladOS, and accidentally re-activate her...</p>\n<p>Portal 2&#39;s core mechanics are very similar to the first game&#39;s ; the player must make their way through several test chambers which involve puzzles. For this purpose, they possess a Portal Gun, a weapon capable of creating teleportation portals on white surfaces. This seemingly simple mechanic and its subtleties coupled with the many different puzzle elements that can appear in puzzles allows the game to be easy to start playing, yet still feature profound gameplay. The sequel adds several new puzzle elements, such as gel that can render surfaces bouncy or allow you to accelerate when running on them.</p>\n<p>The game is often praised for its gameplay, its memorable dialogue and writing and its aesthetic. Both games in the series are responsible for inspiring most puzzle games succeeding them, particularly first-person puzzle games. The series, its characters and even its items such as the portal gun and the companion cube have become a cultural icon within gaming communities.</p>\n<p>Portal 2 also features a co-op mode where two players take on the roles of robots being led through tests by GladOS, as well as an in-depth level editor.</p>",
          "tags": [
              "Singleplayer",
              "Steam Achievements",
              "Multiplayer",
              "Full controller support",
              "Steam Cloud",
              "Atmospheric",
              "steam-trading-cards",
              "Co-op",
              "Story Rich",
              "cooperative",
              "First-Person",
              "Sci-fi",
              "FPS",
              "Online Co-Op",
              "Funny",
              "Female Protagonist",
              "Comedy",
              "Local Co-Op",
              "stats",
              "Steam Workshop",
              "Space",
              "Includes level editor",
              "Captions available",
              "Commentary available",
              "Science"
          ],
          "platforms": [
              "PlayStation 3",
              "PC",
              "Xbox 360",
              "Linux",
              "macOS",
              "Xbox One"
          ],
          "genres": [
              "Shooter",
              "Puzzle"
          ],
          "releaseDate": "2011-04-18",
          "id": "781973bb-801c-4894-925f-96016a825b18",
          "esrbRating": "Everyone 10+"
      },
      {
          "rawgId": 3636,
          "id": "6dc68152-b476-4998-b969-c8f3e582741f",
          "description": "<p>The Last of Us is a post-apocalypse 3rd person adventure with a distinct focus on naturalness and photorealistic graphics. It is the first title in the IP, followed by the second part, coming out in 2019 by Naughty Dog, mostly known for &#39;Crash Bandicoot&#39; and &#39;Uncharted&#39; series.<br />\nYou play as Joel, delivering small requests in America, the year 2033, precisely 20 years after Cordyceps fungus catastrophe which have turned human hosts into infected shrooms. Your next quest is to deliver 14 years-old Ellie, immune to the virus to the hospital in the other end of a state. It is a usual story of two characters getting along throughout their journey.<br />\nYou need to fight fungus infected and usual soldiers, patrolling the territory — ammo and health are of the essence here, because it is post-apocalypse and everyone is short of resources. You face multiple encounters with bosses, various traps, and numerous puzzles. Let alone the number of collectibles telling a complete story of an epidemic world.</p>",
          "genres": [
              "Action",
              "Adventure"
          ],
          "backgroundImage": "https://media.rawg.io/media/games/364/3642d850efb217c58feab80b8affaa89.jpg",
          "tags": [
              "Multiplayer",
              "Atmospheric",
              "Survival",
              "Stealth",
              "Action RPG",
              "Action-Adventure",
              "Zombies",
              "exclusive",
              "3rd-Person Perspective"
          ],
          "metacriticScore": 95,
          "platforms": [
              "PlayStation 4"
          ],
          "website": "https://www.playstation.com/en-us/games/the-last-of-us-remastered-ps4/",
          "pageNumber": 3,
          "esrbRating": "Mature",
          "screenshots": [
              "https://media.rawg.io/media/games/364/3642d850efb217c58feab80b8affaa89.jpg",
              "https://media.rawg.io/media/screenshots/5a7/5a74e852355169e1767f3b59d5488829.jpeg",
              "https://media.rawg.io/media/screenshots/a4b/a4b8e8d4d56d1889f76872da7364e406.jpeg",
              "https://media.rawg.io/media/screenshots/1ba/1babd5640e3eed7646b6f2834daab303.jpeg",
              "https://media.rawg.io/media/screenshots/9ce/9ce9018611e2931782b87ef8b4bcd012.jpeg",
              "https://media.rawg.io/media/screenshots/5c9/5c9c1f58a945bb06f5467587a9d6d0e4.jpeg",
              "https://media.rawg.io/media/screenshots/6ea/6ea8e1f3d812f7218f9205c1dd658147.jpeg"
          ],
          "releaseDate": "2014-07-29",
          "name": "The Last Of Us Remastered"
      }
    ]
  );

  console.log(games);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("Fetching data...")
  //     const games = await getTenHighestRatedGames();
  //     console.log(games)
  //     setGames(prev => [...games]);
  //   }
  //   fetchData();
  //   console.log("Games: ", games);
  // }, []);

  return (
    <div>
      <h1>Highest Rated Games</h1>
      <hr />
      {games.map((game) => (
        <GameCard 
          game={game}
          key={game.id} 
        />
      ))}
    </div>
  )
}

export default HighestRatedGames;