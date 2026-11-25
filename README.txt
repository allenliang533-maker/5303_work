LIMINAL MEMORIES / BEIJING, C. 2000
Desktop + Quest 3 WebXR delivery

OPEN LOCALLY
Double-click Start-preview.cmd. Keep its window open while using the experience.
Open the printed localhost address in PC Chrome or Edge. Do not double-click index.html.
The launcher uses installed Node.js or the Codex-bundled runtime. It installs nothing and changes no system settings. If neither runtime exists, install Node.js or use an HTTPS host.
Ports start at 8080 and advance if occupied. Restart an already-running launcher after replacing this package so it serves the final runtime manifest.

WIRED QUEST LINK
Enter Quest Link in the headset first. In the PC Meta Quest Link app, confirm it is the active OpenXR runtime under Settings > General.
Run Start-preview.cmd and open its local address in PC Chrome / Edge. Click Quest Link · Local VR. The button can retry after the headset becomes available.
Pull the trigger inside VR to unlock sound and the original TV programme. Clicking Enter VR alone does not start audio. Re-entering VR requires a new trigger action.

CONTROLS
VR: left stick to walk, right stick to turn, trigger / pinch to enable sound and click a card. Point at Close & continue and pull/release the trigger. Right A opens view/walk settings; grip toggles mute. Exit through the system menu.
Desktop: choose Desktop preview, drag to look, WASD / arrows to walk. Click a card to close it. Esc closes a card first, then returns home. Touch movement buttons are provided.
Clicking Desktop preview starts the same ambient sound, proximity sound effects, footsteps and TV programme used in VR. Use the sound button or M to mute / unmute. If the browser pauses audio, click Enable sound or the scene to resume it.

VIEW & MOVEMENT
Default virtual eye level: 1.34 m (adjustable 1.10–1.70 m).
Default speed: 2.10 m/s (adjustable 1.20–3.20 m/s).
Walking sway: 35% by default; 0 turns it off. Settings are available before entry and from right A inside VR.
VR uses a fixed baseline height offset while retaining live tracked head motion and crouching. Height, visual sway and transitions interpolate smoothly.
Locomotion uses a kinematic capsule, acceleration, ground drag, collision substeps and flat-floor gravity/contact. Props remain static: there is no jumping, climbing, riding or object rigid-body simulation.
Footsteps are distance-paced one-shots. They require actual virtual walking distance, grounded motion and audio unlocked by Desktop preview or an XR interaction. Holding a stick against a wall does not create repeated footsteps. Muting, hiding the page or returning home silences them in either mode.

THE SUGGESTED WALK
A blue ground trail and numbered markers connect all 19 exhibits in a suggested order. The path is about 112.1 m, checked against the exported GLB collision geometry with 0.28 m clearance.
Approach the current numbered viewing point to open a card. Virtual walking pauses while a card is open. Close it manually to advance the suggested stop. A short cooldown and a small amount of movement prevent repeated popups.
Cards use English childhood-memory text plus design notes, presented in blue millennium-era window chrome. The writing evokes Beijing around 2000 and mixed family memories; it is interpretive, not a historical reconstruction.
The walk has no forced ending. After all 19 cards, continue exploring or choose Restart walk. The trail can be hidden without disabling cards.
See INTERACTIONS.txt for the full order, viewing points and card text.

GITHUB PAGES / STANDALONE QUEST
Upload every file in this runtime folder to the repository root; keep .nojekyll. Enable Settings > Pages > Deploy from a branch > main > /(root), or publish the complete folder with your existing workflow.
Open the resulting HTTPS URL in Quest Browser. A plain LAN HTTP URL is not sufficient for immersive WebXR on a separate headset.
The HTML contains Three.js r180, its loader/collision tools, styles, all application logic, route data and card text. There is no CDN or external runtime dependency.
Eight scene-part-*.bin files, scene-web.parts.json, eleven MP3 files, tv-program.mp4 and two JPEG illustrations sit beside the HTML. Every URL resolves relative to the current page directory, including a GitHub Pages project subpath.

MEDIA & PERFORMANCE
The original 16.3 MB scene is delivered as eight chunks of at most 2 MiB, with two parallel requests. Failed transfers retry up to three attempts. Byte counts and SHA-256 hashes validate chunks and the assembled GLB before parsing. Audio, video and illustrations share the validated retry loader. Source GLBs and Blender files are not needed in this runtime folder.
Original English-captioned pictures and a 24-second silent TV programme are included. The new carpet footstep is original synthesized audio. Recording sources and model metadata are credited in SOURCES.txt.
The trail uses one batched line draw and one instanced arrow draw; distant/invisible labels are culled. Dynamic shadows and postprocessing are disabled. XR framebuffer scale is 0.9 with foveation 1.
All visual transitions use frame-rate-independent interpolation. Headset tracking itself remains native.

VALIDATION
Automated geometry checks cover all 19 connected viewing points and every path segment.
Browser and simulated Quest checks cover loading, English UI, lowered view, faster walking, footstep unlock/playback, automatic cards, controller-ray close, A-button settings, sway Off and session cleanup.
Physical Quest 3 comfort, text readability, actual Link connection and sustained headset frame rate still require on-device confirmation. Simulator frame rates are not Quest frame rates.
No online deployment was performed; this package is for the user's chosen hosting workflow.

DEBUG
getExperienceDiagnostics() is read-only and reports motion, audio, route progression, card state and render statistics. Audio diagnostics include preview mode, playback permission, decoded filenames, context state and per-channel levels.
If the Blender layout changes, re-export the GLB and regenerate the embedded route, collision footprints and exhibit coordinates together.
