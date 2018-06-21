MissionDude v1.7.1 by Mikali
Created: 2006/11/05
Updated: 2018/06/20
Homepage:	http://isometricland.net/homeworld/homeworld.php
Discussion:	http://forums.relicnews.com/showthread.php?t=120414


================================================================================


DESCRIPTION

This is a map editor for Homeworld 2. It supports drag-and-drop editing of 
files, loading and saving works in progress, as well as exporting and importing 
to and from HW2's ".level" file format. There are a variety of built-in 
functions to create maps in different shapes and sizes. All level files use a 
common data-driven API that makes maps much easier to modify later.

See the program help files for additional information.


================================================================================

LICENSES

MissionDude is licensed under the GPLv3. This includes any JavaScript, HTML, 
HTA, WSH or CSS scripts included in the "source" folder. I release the Lua 4 
scripts located in the "source/lua" folder into the Public Domain. But please 
give me credit in your own mod or program if you end up using them. I do not 
recall what the software license was for "cjDialogs.dll", however, as I cannot 
find the file on the Web any more. It was created by cj at the Kixtart forums.


================================================================================


INSTALLATION

• Copy the contents of this archive to a folder somewhere on your harddrive. 
  Remember where this folder is located, and create a shortcut to 
  "MissionDude.hta" on your desktop or in your "Start" menu.
• Associate "missiondude.ico" with the shortcut. You do this by right-clicking 
  on the shortcut, selecting "Properties", and locating "missiondude.ico" using 
  the "Change icon..." dialog.
• If you are running a 32-bit version of Windows: Copy "cjDialogs.dll" to your 
  "Windows\system32\" folder and register the file using "regsvr32.exe". For 
  example, after copying "cjDialogs.dll" to the correct directory, type the 
  following command-line into the "Start > Run" prompt:

	"regsvr32 cjDialogs.dll"

• If you are running a 64-bit version of Windows: Copy "cjDialogs.dll" to your 
  "Windows\SysWOW64\" folder and register the file using "regsvr32.exe". For 
  example, after copying "cjDialogs.dll" to the correct directory, type the 
  following command-line into the "Start > Run" prompt:

	"regsvr32 C:\Windows\SysWOW64\cjDialogs.dll"

• You may need to run the Command Prompt as Administrator in order to register 
  the DLL file.
• Install a recent version of Internet Explorer. (Version 7 or higher.)
• Make sure that version 5.6 or later of the Windows Scripting Host 
  (abbreviated WSH) is installed. The latest version is version 5.7. It offers 
  several benefits, including increased performance, so there's no real reason 
  not to update. Version 5.7 can be downloaded here:

	http://www.microsoft.com/downloads/results.aspx?pocId=&freetext=windows%20script%205.7&DisplayLang=en

  Note that version 5.6 comes pre-installed on Windows XP, and version 5.7 
  comes pre-installed on Windows Vista, so you may not have to update anything.
• Install version 3.03 of the Adobe SVG browser plugin (abbreviated ASV). It 
  can be downloaded here:

	http://www.adobe.com/svg/viewer/install/main.html

  The pre-release of version 6 is not recommended, as undesired graphical 
  glitches and poorer performance result as a consequence of using it.
• Since users of Windows 7 64bit have been having problems installing the 
  program, I created a YouTube video tutorial showing how to install it on that 
  operating system, here:

	https://www.youtube.com/watch?v=dQttG-z4Y8E


================================================================================


RUNNING THE PROGRAM

The file with the ".hta" extension is the executable. Simply double-click on it 
to run the program. See the installation instructions, above, for directions on 
how to associate a shortcut and icon with this executable.


PROGRAM HOTKEYS

• Alt+T		Switch between objects, containers and map settings.
• Alt+P		Switch between properties and "More..." properties.
• Alt+V		Switch between map views.
• Alt+H		View help.
• Alt+N		New map.
• Alt+L		Load map.
• Alt+S		Save map.
• Alt+D		Delete map.
• Alt+E		Export map.
• Alt+I		Import map.
• Alt+F		Compile map.
• Alt+O		View options.
• Alt+G		Toggle map legend.
• Alt+C		Toggle point-capturing.
• Alt+-		Move the selected object down in the list.
• Alt+=		Move the selected object up in the list.
• Tab		Switch to next dialog.
• Shift+Alt+Key	Reverse direction of switching.
• Ctrl+-	Zoom the entire window out.
• Ctrl+=	Zoom the entire window in.
• Ctrl+0	Set the entire window to its default zoom state.
• Ctrl+Mousewheel	Zoom the entire window in or out.
• Ctrl+Left-click	Zoom map in.
• Ctrl+Left-click+Drag	Zoom map in on a specific area.
• Shift+Ctrl+Left-click	Zoom map out.
• Alt+Left-click+Drag	Pan map.
• Alt+F4	Exit the program without saving.


BACKGROUND IMAGES

You can place a custom background image behind each map view by copying them 
into the "source\xml" folder and turning them on in the Options menu. This is 
helpful if you want to use a graphic as a guide when designing your map.


TUTORIAL

There is a short tutorial on how to design your first map in the Help menu.


================================================================================


CREDITS
• The excellent SVG tutorials at carto:net (http://www.carto.net/) and 
  KevLinDev (http://www.kevlindev.com/).
• Mouse-capturing code by Kevin Lindsey (KevLinDev).
• cj at the Kixtart forums 
  (http://www.kixtart.org/forums/ubbthreads.php?ubb=cfrm) for "cjDialogs.dll".


================================================================================


CHANGE LOG

1.7.0
• Object names are now stored in a separate name field instead of in the label. 
  This way, when importing levels, objects with identical names (which is 
  legal) aren't also given identical labels (which is illegal).
• The program no longer appends extra numerals at the end of an object's name 
  when the object has an Amount value greater than one. Instead, all instances 
  of the object are given the same name. This is a departure from how the level 
  scripts used to work, as well as how my MapFunctions collection /still/ works.
• Fixed a bug with the AppVersion variable that was preventing people from 
  re-importing level files previously exported by the program.
• The program now notifies the user with an error if it encounters the 
  "dofilepath" HW2 Lua function. MissionDude does not support the use of this 
  function. Sorry!
• Made the warning message when there are unsaved values a little more clear.
• The XYZ counter on the bottom of the map has been made larger and colored 
  to match the axes in the map view.
• The SVG map now ignores right-clicks when determining whether a mouse button 
  has been pressed or released.
• Implemented a hack to keep volatile map mouse events from firing immediately 
  after loading exiting on of the save/load/etc. file dialogs.
• Fixed the bug where the "Properties" and "More..." buttons weren't being 
  toggled properly when switching between the custom shape objects.
• Fixed a bug that occurred when checking for unused distributions.
• Made the text input fields for the level name and level author a bit larger.
• You can no longer import paths, sobgroups, reactive fleets and reactive 
  resources. A warning message now also pops up telling you so.
• Players were not being imported properly due to the first player having a Lua 
  table index of 0, when tables in Lua should really start with 1.
• Merged the Squadron and Megalith object types back into each other again.
• Reactive squadron objects were missing their sobgroup parameter, as well as 
  a sobgroup selection window. I restored these.
• The object subtype menu would not close if you made the same selection as 
  before or hit the cancel button.
• Closing a child window now resets the status bar text to its default value.
• Start points are now named automatically by the Lua level scripts on a first-
  come, first-serve basis.
• Fixed rotation and translation bugs in "branchAdd".
• Updated the sample maps so they work properly with all the other recent 
  changes. I've loaded, saved, imported and exported all of them to make sure 
  they are working.
• Changed the increment you can increase or decrease the grid size from 10 or 
  1/10 to 5 or 1/5.
• Added a new photo of a galaxy as the map background.
• You can now toggle the background photos on and off.
• The background photos have been moved to the "source\xml" folder.

1.6.3
• Enlarged the map somewhat so you can build bigger maps.

1.6.2
• Program was trying to save/export the program version number as a number 
  despite having two periods in it.

1.6.1
• Updated the help documentation.
• Renamed the 'None' (Special Command) to 'Off'.
• Fixed style of 'Clone' button when using the 'Blue' skin.
• 'Remove' button was no longer being disabled/enabled at the correct times 
  when the 'Clone' button was added in the last release.

1.6.0
• 'Select Type' window title fixed.
• Clicking 'Done' now closes the window(s) properly.
• Added a 'Clone' button to clone the currently selected object.
• Object properties were not cleared when creating a new distribution.
• The distribution selection window was not opening. (Thanks cybersam.)
• Objects were not being labeled properly (the counter was incrementing by too 
  large of values sometimes).
• The 'Save' and 'Reset' buttons are now grayed out after saving an object or 
  document.
• Some map objects were unselectable using the mouse.
• The 'squadrontest.map' demo file was not updated properly in a prior release.
• Split preview options into two columns.

1.5.6
• The program now checks whether distributions aren't utilized by the map.
• The various error messages thrown while saving a map have been joined into a 
  single message.
• Changed slightly how pane-switching is done.
• Abbreviated "Reactive Squadron" and "Reactive Asteroid" to "RvSquadron" and 
  "RvResource" in all instance.
• Removed ability to set the "Rotation" parameter for objects which can't be 
  rotated (or for objects where there's no point to rotate).
• The "Capture" command now requires that the SHIFT key be held when clicking 
  on the map.
• Added two new commands: "Jitter" and "Target". The "Jitter" command causes an 
  object's position to be altered by a random amount along all three coordinate 
  axes. The maximum amount an object can be "jittered" can be specified for 
  each axis in the "Options" dialog. The "Target" command allows one to rotate 
  an object so that it faces another object. Like the "Capture" command, the 
  "Jitter" and "Target" commands require that the SHIFT key be held when 
  clicking on the map. Only one of the three commands may be active at one time.

1.5.5
• Fixed the bug where map objects were growing in size when trying to drag them 
  in ASV6.
• Fixed the bug where disabled filters were blanking the screen in ASV6.
• The program now uses a ".dll" file for all file I/O operations. The file 
  needs to be copied to the "Windows\system32\" directory and registered using 
  "regsvr32.exe" before MissionDude can be used.
• The default import/export folder paths are now saved automatically after 
  importing/loading or exporting/saving a file. There is no longer any visible 
  means of changing them manually.
• Worked around the issue with the last version of MissionDude where the 
  program was crashing on Windows Vista. One side-effect, unfortunately, is 
  that performance is now much slower on Vista than it is on Windows XP. 
  Hopefully, Microsoft will release a real fix for this in the future.
• Saved maps have been condensed a bit further.
• More code has been condensed.
• Removed the "Delete" button, as file deletion can now be achieved easily 
  using the load/save dialogs.
• The "More..." button is now only enabled when an object has properties that 
  make use of it.
• The "viewangle" parameter is now indexed starting with zero instead of one.
• The user is now prompted to save objects when setting values to their 
  defaults.
• Split the "Other" tab into two tabs: "Level" and "Info". Added the "Players" 
  dialog to the "Level" tab.
• You can now manually define player characteristics (i.e., the "player" table 
  in the exported level file) using the new "Players" dialog. You can specify 
  the race, name and starting RUs for each player, as well as whether a 
  starting point is required.
• Removed the "maxPlayers" and "levelDesc" options from the "Level Settings" 
  dialog. The "levelDesc" option was moved to the "Info" tab. "maxPlayers" is 
  now calculated automatically based on the number of players.
• Moved the SVG and HTML files to a new "XML" subdirectory.
• Renamed the "style" subdirectory to "css".
• Other fixes.

1.5.3
• Fixed bug when changing application settings to their default values.
• Fixed bug in "returncopy" function.
• Removed the "false color" filter of the highlight and select box SVG elements 
  added in the last version. It was slowing things down too much, and was ugly 
  to boot. I'll leave it to users to adjust the color settings of the 
  background image to fit the application, instead of vise versa.
• Turned off anti-aliasing of background images.
• Fixed bug where status box and legend became hidden when adjusting the 
  "mapzoom" option.
• Refactored the way map object selection is done to make it more similar to 
  the way it is done for other objects.
• Lots of little changes.
• Speed of map rendering improved. The map is now rendered only once per map 
  zoom.
• Most DOM nodes and events are now nullified upon unload. This mainly resolves 
  memory and performance issues I was encountering when repeatedly refreshing 
  the application, but may also decrease load (or reload) times at other times, 
  as well.
• The occasional error when displaying (or trying to display) the progress bar 
  or a child window should now be resolved.
• Converted the text element for the "Function" SVG map object to a path 
  element.
• You can now zoom in the map all the way to 16x (at least, near the center of 
  the map).
• Adjusted the parameters of the map and mouse coordinate checking routines in 
  case I need to scale the contents of the SVG file at some point in the future.

1.5.2
• Added "Snap to Grid" and "Grid Size" options.
• The map select and highlight boxes are now black or white depending on the 
  luminance of the underlying color.
• You can now place a background image over the map. Simply place three images, 
  named "image1.png", "image2.png" and "image3.png", in the "MissionDude/maps" 
  folder. You can set the position and displayed size of the images in the 
  "Options" dialogue.

1.5.1
• Switched to a table format for "settings.ini". Old settings are no longer 
  compatible with the new method.
• More code optimizations, this time for space/managability instead of speed.
• Fixed the "returncopy" function so that it actually does what it's supposed 
  to.
• Fixed bug where level settings weren't being imported.
• Fixed bug where the "Author" and "Comments" settings were in some cases not 
  being updated properly when importing levels.
• The map is now only reset if the calculated sizes are different than they 
  were before. (Was causing some slow-down on my setup.)
• Fixed bug where objects weren't being removed from sobgroups or paths when 
  their types changed to something unsupported.
• Fixed bug where sobgroups and paths weren't being updated when objects were 
  deleted.

1.5.0
• Fixed bug where buttons were being activated belatedly when adding objects.
• Enlarged the size of the "Point" and "StartPoint" SVG elements.
• Whatever object gets grabbed now automatically is popped to the top of the 
  stack.
• The select highlight box is now located in the top layer, above all the other 
  map objects.
• The program now differentiates between regular squadrons and megaliths.
• Fixed bug where object labels were incrementing by twos instead of by ones.
• Significant speed-up of the SVG map. One result is that the coordinates of 
  the mouse are now displayed in the bottom-right corner of the map itself, 
  instead of in the application's status field.
• Significant speed-up of all file I/O operations due to optimizations.
• The child windows generated for such things as the "Load" and "Options" 
  dialogs now use real, modeless windows instead of fake, floating DIVs.
• Fixed the bug where the two different versions of the "getn" and "tinsert" 
  functions were conflicting with each other when importing levels that were 
  made using MissionDude.
• Fixed the bug where you couldn't import or compile levels with spaces in 
  their filenames.
• Map loading and initialization now also shows the progress bar. There is also 
  additional error checking.
• Probably some miscellaneous other bug fixes I neglected to remember.
• The help files are once again combined into a single HTML file instead of 
  being spread across multiple IFRAMEs.
• Drop shadows now work! They are now also enabled by default.
• Added a "Scale on Zoom" option to configure whether map objects get scaled 
  when zooming. Disabling it speeds up the redraw speed when zooming, but slows 
  it down when dragging, so there's a trade-off in either case.
• The map select box now scales to the width of the text element.

1.4.4
• Fixed bug in positioning of map objects when dragging.
• Speed improvement when dragging objects.

1.4.3
• Fixed bug in "makeRectangle" in "MapFunctions.lua".
• "MapFunctions.lua" has been split into several files. The program now only 
  adds custom level functions to the exported ".level" file when and if they 
  are needed, thereby saving disk space and reducing download times.
• The map is no longer reset each time the view is switched, speeding up the 
  editing process.
• Fixed several bugs in "importlevel.lua". (Thanks JMScomp!)
• Switched back to absolute instead of fixed positioning for child windows. It 
  now works in IE6 again. (Thanks JMScomp!)
• Map object labels are now generated/displayed in a different manner, 
  resulting in fewer SVG elements being added to the map and increased speed, 
  hopefully. Especially beneficial for heavily populated maps.
• Replaced all anonymous functions, thereby eliminating memory leaks and 
  otherwise improving performance.
• Added a progress bar and additional confirmations for several file I/O 
  operations.

1.4.2
• The map window now retains its relative scale as you resize the application 
  window, and remembers these settings for the next time you run the program. 
  As a consequence, the "Map Width" and "Map Height" options have been removed.
• Fixed the bug where map axes were changing size at a different rate than the 
  rest of the map.
• Fixed the bug where text size option wasn't being loaded when the application 
  started.
• The program now has a separate "Zoom" option to control the inital scale of 
  the map.
• Slight change to the "Default" stylesheet.

1.4.1
• Some stylesheet changes.
• Switched to a stripped-down version of "MapFunctions.lua" without comments, 
  so that exported level file sizes are smaller.
• Fixed a bug in the Boy, Klein and Kuen surfaces in "MapFunctions.lua".
• Maps are now compiled with the "-s" switch so that they take up less space. 
  As a result, they can now also never be decompiled.
• Sorted the source files into directories.
• Fixed bug with saving output and input folder paths.
• The program now reports any Lua script errors in the level file being 
  imported.

1.4.0
• Level import feature working with the help of "Lua4.exe"!
• Level compile feature added utilizing "LuaC4.exe".
• Saved maps now have a slightly smaller filesize.
• Fixed the bug where creating some objects having the "Radius" parameter was 
  causing errors.
• Modified the default parameters for the "shapeAdd" function a bit.
• Fixed the bug where the "globeAdd" function wasn't working in 
  "MapFunctions.lua".
• Merged the "Camera" object's "Translation" and "Origin" parameters.
• Fixed the bug with repeating escape sequences in strings.
• The "Unsaved changes" warning message is now disabled when switching between 
  the "Properties" and "More..." tabs.
• Changed the name of the "FogType" paramater to "Type".
• Added the remaining fog parameters, as well as "setFXWind".
• Added new map objects: "Literal", "DirLight", "ReactiveSquadron" and 
  "ReactiveAsteroid" (abbreviated "Rv. Squadron" and "Rv. Asteroid", 
  respectively).
• Added another sample map demonstrating all the different special functions. 
  Removed one older one.
• Fixed support of "literalAdd" function in "MapFunctions.lua".
• Sobgroups and paths are now updated when modifying objects.
• The owner player and class of squadron (either normal or reactive) is now 
  shown in brackets next to the label for a squadron.
• When exporting levels, sobgroups are now created before the distributions are 
  added. (This was necessary in order to properly support reactive fleets.)
• Fixed bugs with "addSobgroup" and "getn" functions in "MapFunctions.lua".
• Changed the way squadrons are added to sobgroups. A table of sobgroups is now 
  exported to the ".level" file and parsed using a new function added to 
  "MapFunctions.lua". Also, sobgroup creation is now done in a separate step 
  from squadron addition.
• Fixed possible bug with the "Camera" object in "MapFunctions.lua".
• Added an "Import Folder" option in addition to the "Output Folder" option.
• Fixed bug with "setDefaultMusic" when exporting.
• More rigorous error checking when doing file I/O operations.

1.3.4
• Many SVG elements consolidated.
• Size of "Data.js" decreased.
• More speed improvements.
• Fixed bug where object's translation coordinates weren't getting updated when 
  dragging the object (bug may have been introduced between versions).
• Added a "Drop-shadow" option. Requires a *very* fast CPU.

1.3.3
• The program now only checks for the application's (not the SVG map's!!!) zoom 
  level when maps are loaded or the application is refreshed (e.g., by using 
  the F5 key). Before, there was a timer that would periodically update this 
  value (this, because the "onresize" event wouldn't consistently fire in IE7), 
  but I believe it was causing a memory leak.
• Removed the 8 and 4-bit application icons, as they were creating artifacts 
  when displayed in the Windows taskbar. Not sure what causes this problem (it 
  may be an HTA bug, I don't know).
• The map legend's position is now updated when you toggle it on or off.
• The program now selects the correct file to export or save to if it exists. 
  If not, it suggests a value for the file name.
• You now have to save a file first before you may export it.
• Added a new stylesheet for the application and enabled it by default. The 
  stylesheet can now be selected from the "Options" menu.
• Many buttons are now disabled depending on the number of objects available.
• Starting a new map no longer resets the application.
• You can now add comments to your map.
• Renamed the "Map" button to "Other".
• The colored axes now scale according to the width and height of the map 
  window.
• Slight speed improvement when moving the mouse over the map.
• The status text is no longer reset when moving the mouse away from a map 
  object.

1.3.2
• Improved documentation.
• Fixed mouse coordinates when the entire application is zoomed using CTRL and 
  the mousewheel.
• Added a doctype. The application no longer runs in quirksmode and is, as a 
  result, more standards-compliant.
• Increased the dimensions of all the selection list panes.
• Put all the help articles into their own individual pages and made it so that 
  they are loaded using IFRAMEs.
• User is now permitted to choose to continue saving despite errors.
• Program now checks for an extension before saving or exporting a file.
• Created a new, Vista-compatible icon.

1.3.1
• Fixed the bug where renaming an object caused it to not be selectable.
• Fixed the bug where dragging an object in one map view caused the coordinates 
  to be messed up for the other views.
• Text contained within map objects' text nodes no longer becomes selected 
  (e.g., blue, like when selecting text to copy) when dragging objects.
• Saved maps now take up a little less disk space.
• The program now asks you whether you want to save or export when there aren't 
  enough players or starting positions (in case you prefer to manually 
  configure them in a text editor).
• Fixed the bug where some objects' translation coordinates weren't being 
  updated if other objects in the distribution had been removed.
• Fixed the bug where removing the first object in the distribution caused the 
  (next) current object not to be set properly.
• The radius of an object such as a nebula or cloud is now represented using a 
  partially opaque circle.
• Added "Defaults" button to object properties list.
• Noted another hotkey.
• Replaced the "Map Size" button with "Map Width" and "Map Height" input 
  fields, so you can set the map dimensions explicitely.
• Position capturing is now once again only enabled when "Capture" mode is on. 
  However, you may use either the mouse or the "Add" button.
• You can now once again drag objects while "Capture" mode is on.
• Added another sample map.

1.3.0
• Map loading fixed again!!!
• Refactored the code base to reduce the amount of redundant code. Should be a 
  little faster, too.
• Added several example maps that show various different features in use.
• Labeling of objects is now done separately from counting. (This may end up 
  being undesirable...)
• Fixed bug where removing the last object in a distribution wasn't causing the 
  properties to reset to blank values.
• Squadrons are now removed from the pool of available objects once they are 
  added to a sobgroup.
• You can now add the same point to a path more than once.
• You can now add points and squadrons with "Amount" values greater than 1 to 
  paths and sobgroups.
• Merged the "Name" and "Label" object properties.
• Special characters and spaces are no longer allowed in distribution labels. 
  They're now also handled properly in sobgroup and path labels, thereby 
  preventing issues when saving/loading/exporting. GIGANTIC BUG!!!
• Added "Output Folder" setting to program options. You can now specify what 
  folder maps and levels are saved to.
• Added "Author" setting to map settings.
• Exported level files now show the program they were created with, the date 
  they were created, the date they were last modified and the author who 
  created them.
• The program now generates an error when two objects have the same label.
• The "Edit" window for distributions, paths and sobgroups no longer opens if 
  there are no containers to edit.
• The program now checks whether an object exists with a particular label 
  before adding a new object.
• The user is now prevented from removing/editing/renaming the "Main" 
  distribution.
• The program now exports the distribution tables in the proper order, 
  regardless of the order they are listed in the selection box.
• There is now a button to select a distribution for the special functions that 
  require them. Only those distributions which don't already exist in the 
  object's hierarchy are displayed.
• The user is now warned when parameters haven't been saved before issuing most 
  commands.
• The program now prevents users from inputting a reserved word as a label for 
  an item.
• Improved mouseover status text.
• The program now prevents users from saving or exporting a map if a 
  distribution, sobgroup or path exists and is empty.
• Most main window commands are now disabled if a child window is open.
• The map legend now stays fixed when panning the map.
• The coordinate axes on the map now each have a different color.
• The map grid is now a slightly lighter shade of gray.
• Changed the icon for the "Camera" object slightly.
• Other map objects' text no longer appears when you've already grabbed an 
  object.
• Fixed bug where zooming with the mouse while hovering over an object caused 
  errors.
• Fixed bug where panning with the mouse while hovering over an object caused 
  errors.
• Fixed bug where object labels on map can sometimes would not clear when 
  fidgeting with the mouse. (It still sometimes happens though.)
• Double-clicks now register as two separate mouse clicks, for faster 
  navigation.
• Added "+" and "-" buttons to the lists of sobgroups and paths.
• Adding a new object now results in a duplicate of the currently selected 
  object, by default. (This was previously only the case in "Capture" mode.)
• Added a few more hotkeys for moving objects up and down in the lists.

1.2.3
• "New and anonymous copies of objects" problem fixed for good, this time. Whew!
• User is now warned to fill all of an object's parameters before saving the 
  object.
• The program now fills in default properties when creating new objects.
• Fixed a bug in "MapFunctions.lua". Included the new version.
• The sample map included with the program can now actually be exported to a 
  working level file. (Doh!)

1.2.2
• You can now type in a filename to load.
• Fixed broken map loading causing new and anonymous copies of objects to be 
  created.
• Slight change to label incrementation when adding new objects.
• You're now informed about which file gets deleted or overwritten (even though 
  it was pretty obvious).
• Fixed point-capturing when the mouse clicks on another object.

1.2.1
• Labels for properties were sometimes breaking onto a new line.
• Improved documentation and help.
• Added several new keyboard shortcuts. Changed "ALT+O" to "ALT+T".

1.2.0
• Fixed bug where adding an object without saving its properties caused maps 
  not to save.
• Fixed bug where saving or resetting an object's properties caused a new and 
  anonymous copy of the object to be created.
• Updated to latest version of "MapFunctions.lua".
• The names of those objects which can take a name are now incremented 
  automatically if more than one are added at a time. This is always the case 
  with start points.
• Improved drag-and-drop support. It is now enabled by default.
• Added a "Delete file" dialogue.
• Added "Help" dialogue.

1.1.0
• You can now save and restore viewing settings.
• Default map size increased.
• Changed color of text for deselected tabs.
• You can now reorder points and squadrons within existing paths and sobgroups, 
  respectively.
• Changed the name of the main executable file.

1.0.1
• Fixed the bug where the player table wasn't being added properly.

1.0.0
• Initial release.


================================================================================


ISSUES

• I recently discovered that JavaScript doesn't have such a thing as "block 
  scope" (though it may be added at some time in the future), like Lua and 
  other programming languages have. A lot of the code should probably be 
  rewritten to reflect this.
• I'm a little suspicious of the "recursiveplayersearch" function. I wasn't 
  thinking clearly when I wrote that one. Anyway, it seems to work and is 
  unlikely to cause any problems.
• Sometimes map object labels do not disappear when hovering over another 
  object. To make the label disappear, simply hover the mouse over the object a 
  second time.
• Squadron and point names do not increment properly if the distribution they 
  belong to is referenced more than once by the same map. This problem is 
  extends to "MapFunctions.lua", as well.
• Search for 'wasdistribution' for some disabled code.
• In "MapFunctions.lua" it would be better to reference the special functions 
  using strings and give the "Distributions" table global scope. However, the 
  "dostring" functions doesn't work in ".level" files, preventing such strings 
  from being executed. Also,the special functions themselves have global scope, 
  creating a conflict between the functions and the "Distributions" table 
  depending on which gets defined first. As it stands now, the "Distributions" 
  table must get defined as a local variable within the "DetermChunk" function, 
  or as a global variable at the very end of the ".level" file.
• The accesskeys (hotkeys) do not all work properly in the "Default" visual 
  style due to some of the buttons being disabled under certain circumstances.
• There may end up being an issue with how player info (e.g., data that gets 
  added to the "player" table in the level file) is stored and later retrieved 
  by the program. This is because the info is stored in an associative array. 
  According to the JScript documentation, "When iterating over an object, there 
  is no way to determine or control the order in which the members of the 
  object are assigned to [a] variable." However, I use associative arrays 
  extensively throughout the program, and have found that indices are always 
  retrieved in the same order that they're initially added. It's possible that 
  this may not hold true for older versions of JScript (or of the Windows 
  Scripting Host).
• It would be better to have only one file format instead of saving as ".map" 
  and exporting as ".level". However, the whole scope of Lua functions are not 
  available in level files, making it hard to do things (like store path data as 
  an array). These same issues mean that levels generated using MissionDude 
  can't necessarily be imported back into the program.
• Accesskeys no longer working as of Internet Explorer 10 as far as I can tell.
