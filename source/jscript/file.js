// Copyright (C) 2009  Michael Horvath

// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

// ---------------------------------------------New map

function newfile()
{
	if (childwindowopen || checkunsavedvalues() || checkunsaveddocument())
		return 0
	var StartTimeFile = new Date()
	previoustable.loadfile = currenttable.loadfile
	currenttable.loadfile = 'Untitled'
	activefile = currenttable.loadfile
	var TempPath = '.\\source\\jscript\\data.js'
	var CheckFile = fso.FileExists(TempPath)
	var TempBool = 0
	if (CheckFile)
		TempBool = 6
	else
		programerror('Can\'t find "data.js".')
	if (TempBool != 6)
		return 0
	try
	{
		var LoadFileText = ''
		var LoadFileObject = fso.OpenTextFile(TempPath, 1, 0)
		LoadFileText = LoadFileObject.ReadAll()
		LoadFileObject.Close()
		eval(LoadFileText)
		updatelevelsettings()
		initialize(StartTimeFile)
//		setunsaveddocument()
	}
	catch (e)
	{
		programerror('There was an error starting a new file.')
		return 0
	}
	unsetunsaveddocument()
}

// ---------------------------------------------Loading

function loadfile()
{
	if (childwindowopen || checkunsavedvalues() || checkunsaveddocument())
		return 0
	try
	{
		OpenDialog.Filter = 'MissionDude maps (*.map)|*.map|All files (*.*)|*.*'
		OpenDialog.FilterIndex = 1
		if (fso.FolderExists(AppSettings.mapfolderpath))
			OpenDialog.InitialDir = AppSettings.mapfolderpath
		else
			OpenDialog.InitialDir = WshShell.SpecialFolders("MyDocuments")
		OpenDialog.Title = 'Load a Map'
		OpenDialog.MustExist = true
		if (!OpenDialog.Execute())
			return 0
		var fullpath = OpenDialog.Filename
		var filetitle = fullpath.slice(fullpath.lastIndexOf('\\') + 1)
		var folderpath = fullpath.slice(0, fullpath.lastIndexOf('\\') + 1)
		previoustable.loadfile = currenttable.loadfile
		currenttable.loadfile = filetitle
		activefile = filetitle
		AppSettings.mapfolderpath = folderpath
		var progerr = programerror
		var StartTimeFile = new Date()
	}
	catch (e)
	{
		progerr('There was an error when preparing to load the file.', e)
		return 0
	}
	try
	{
		var LoadFileObject = fso.OpenTextFile(fullpath, 1, 0)
		var LoadFileText = LoadFileObject.ReadAll()
		LoadFileObject.Close()
	}
	catch (e)
	{
		progerr('There was an error reading the file while loading.', e)
		return 0
	}
	try
	{
		blankeverything()
		eval(LoadFileText)
	}
	catch (e)
	{
		progerr('There was an error evaluating the file while loading.', e)
		return 0
	}
	try
	{
		updatelevelsettings()
	}
	catch (e)
	{
		progerr('There was an error updating level settings while loading.', e)
		return 0
	}
	try
	{
		initialize(StartTimeFile)
	}
	catch (e)
	{
		progerr('There was an error initializing the map while loading.', e)
		return 0
	}
	justloaded = 1
	unsetunsaveddocument()
}

// ---------------------------------------------Importing

function importfile()
{
	if (childwindowopen || checkunsavedvalues() || checkunsaveddocument())
		return 0
	var general_warning =	'Certain types of map objects cannot be imported. These include:\n\n' +
				'1. paths created using the "addPath" function\n' +
				'2. sobgroups created using the "createSOBGroup" and "addToSOBGroup" functions\n' +
				'3. reactive fleets and reactive resources\n\n' +
				'In addition, special shapes such as splines, rings, globes, etc. that are created in MissionDude cannot be imported in their orignal parametric form. ' +
				'Instead, the shapes\' contents are treated as individual objects and are added directly to the Main distribution.\n\n' +
				'Lastly, maps that have been compiled using LuaC cannot be imported, and Relic\'s "dofilepath" function is not supported.\n\n' +
				'Continue?'
	var warning_result = warningerror(general_warning, 0)
	if (warning_result == 7)
		return 0
	OpenDialog.Filter = 'Homeworld 2 levels (*.level)|*.level|All files (*.*)|*.*'
	OpenDialog.FilterIndex = 1
	if (fso.FolderExists(AppSettings.lvlfolderpath))
		OpenDialog.InitialDir = AppSettings.lvlfolderpath
	else
		OpenDialog.InitialDir = WshShell.SpecialFolders("MyDocuments")
	OpenDialog.Title = 'Import a Level'
	OpenDialog.MustExist = true
	if (!OpenDialog.Execute())
		return 0
	var fullpath = OpenDialog.Filename
	var filetitle = fullpath.slice(fullpath.lastIndexOf('\\') + 1)
	var folderpath = fullpath.slice(0, fullpath.lastIndexOf('\\') + 1)
	AppSettings.lvlfolderpath = folderpath
	var StartTimeFile = new Date()
	var progerr = programerror
	previoustable.loadfile = currenttable.loadfile
	currenttable.loadfile = 'Untitled'
	activefile = currenttable.loadfile
	previoustable.importfile = currenttable.importfile
	currenttable.importfile = filetitle
	try
	{
		var ExecString = '".\\source\\lua\\lua4.exe" -c -f ".\\source\\lua\\importlevel.lua" "' + fullpath + '"'
		var ImportFileObject = WshShell.Exec(ExecString)
		var ImportFileText = ImportFileObject.StdOut.ReadAll()
		
	}
	catch (e)
	{
		progerr('There was an error executing the shell command while importing.', e)
		return 0
	}
	var errormessage = ImportFileObject.StdErr.ReadAll()
	if (errormessage != '')
	{
		WshShell.Popup('Something happened. Can\'t proceed with the import.' + '\n\n' + errormessage, 0, 'File error:', 0 + 16)
		return 0
	}
	try
	{
		blankeverything()
		eval(ImportFileText)
	}
	catch (e)
	{
		var TempPath = '.\\import_error_log.txt'
		var SaveFileObject = fso.OpenTextFile(TempPath, 2, 1, 0)
		SaveFileObject.Write(ImportFileText)
		SaveFileObject.Close()
		progerr('There was an error evaluating the contents of the file while importing.', e)
		return 0
	}
	try
	{
		updatelevelsettings()
	}
	catch (e)
	{
		progerr('There was an error updating the level settings while importing.', e)
		return 0
	}
	try
	{
		initialize(StartTimeFile)
	}
	catch (e)
	{
		progerr('There was an error initializing the document while importing.', e)
		return 0
	}
	justloaded = 1
	setunsaveddocument()
}

// ---------------------------------------------Saving

function savefile()
{
	if (childwindowopen || checkunsavedvalues() || checkemptycontainers())
		return 0
	var tempfile = activefile
	var extension = '.map'
	if (tempfile.substr(tempfile.length - extension.length) != extension)
		tempfile += extension
	SaveDialog.Filter = 'MissionDude maps (*.map)|*.map|All files (*.*)|*.*'
	SaveDialog.FilterIndex = 1
	if (fso.FolderExists(AppSettings.mapfolderpath))
		OpenDialog.InitialDir = AppSettings.mapfolderpath
	else
		OpenDialog.InitialDir = WshShell.SpecialFolders("MyDocuments")
	SaveDialog.Title = 'Save a Map'
	SaveDialog.Filename = tempfile
	SaveDialog.OverwritePrompt = true
	if (!SaveDialog.Execute())
		return 0
	var fullpath = SaveDialog.Filename
	var filetitle = fullpath.slice(fullpath.lastIndexOf('\\') + 1)
	var folderpath = fullpath.slice(0, fullpath.lastIndexOf('\\') + 1)
	var StartTimeFile = new Date()
	previoustable.savefile = currenttable.savefile
	currenttable.savefile = filetitle
	activefile = filetitle
	AppSettings.mapfolderpath = folderpath
	toggleprogresswindow(1)
	var TempTextTable = [], loadwidth = 0, loadincrement = loadbarwidth/8
	var progerr = programerror, pausedo = setTimeout
	function savefile1()
	{
		try
		{
			doublecheckeverything()
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(savefile2, 0)
		}
		catch (e)
		{
			progerr('There was an error double-checking/correcting parameter values while saving.', e)
			return 0
		}
	}
	function savefile2()
	{
		try
		{
			TempText2 = parsesave(Paths, 1, 3)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(savefile3, 0)
		}
		catch (e)
		{
			progerr('There was an error parsing paths while saving.', e)
			return 0
		}
	}
	function savefile3()
	{
		try
		{
			TempText3 = parsesave(SOBGroups, 1, 3)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(savefile4, 0)
		}
		catch (e)
		{
			progerr('There was an error parsing sobgroups while saving.', e)
			return 0
		}
	}
	function savefile4()
	{
		try
		{
			TempText4 = parsesave(LevelSettings, 1, 2)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(savefile5, 0)
		}
		catch (e)
		{
			progerr('There was an error parsing level settings while saving.', e)
			return 0
		}
	}
	function savefile5()
	{
		try
		{
			TempText5 = parsesave(Players, 1, 2)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(savefile6, 0)
		}
		catch (e)
		{
			progerr('There was an error parsing the player table while saving.', e)
			return 0
		}
	}
	function savefile6()
	{
		try
		{
			TempText1 = parsesave(Distributions, 1, 3)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(savefile7, 0)
		}
		catch (e)
		{
			progerr('There was an error parsing distributions while saving.', e)
			return 0
		}
	}
	function savefile7()
	{
		try
		{
			if (CreatedDate == '')
				CreatedDate = currentdate()
			UpdatedDate = currentdate()
			TempTextTable =
			[
				'LevelAuthor = "', LevelAuthor, '"\n',
				'LevelComments = "', LevelComments, '"\n',
				'LevelDescription = "', LevelDescription, '"\n',
				'CreatedDate = "', CreatedDate, '"\n',
				'UpdatedDate = "', UpdatedDate, '"\n',
				'AppVersion = "', LatestAppVersion, '"\n',
				'Distributions =\n{\n', TempText1, '}\n',
				'Paths =\n{\n', TempText2, '}\n',
				'SOBGroups =\n{\n', TempText3, '}\n',
				'LevelSettings =\n{\n', TempText4, '}\n',
				'Players =\n{\n', TempText5, '}\n'
			]
			TempText = TempTextTable.join('').replace(/,(\s*[}\]])/g, '$1')
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(savefile8, 0)
		}
		catch (e)
		{
			progerr('There was an error concatenating strings while saving.', e)
			return 0
		}
	}
	function savefile8()
	{
		try
		{
			var SaveFileObject = fso.OpenTextFile(fullpath, 2, 1, 0)
			SaveFileObject.Write(TempText)
			SaveFileObject.Close()
			document.title = AppTitle + ' ' + LatestAppVersion + ' - ' + activefile
			unsetunsaveddocument()
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(savefile_end, 0)
		}
		catch (e)
		{
			progerr('There was an error writing to the file while saving.', e)
			return 0
		}
	}
	function savefile_end()
	{
		toggleprogresswindow(0)
		confirmerror('File saved sucessfully. Duration: ' + gettimediff(StartTimeFile) + 's', 1)
	}
	function savefile_begin()
	{
		if (!progresswindowopen)
			return 0
		clearInterval(loadwindowtimer)
		savefile1()
	}
	loadwindowtimer = setInterval(savefile_begin, 10)
}

// ---------------------------------------------Exporting

function exportfile()
{
	if (childwindowopen || checkunsavedvalues() || checkunsaveddocument() || checkemptycontainers())
		return 0
	var tempfile = activefile
	var oldextension = '.map'
	var newextension = '.level'
	tempfile = tempfile.replace(oldextension, newextension)
	SaveDialog.Filter = 'Homeworld 2 levels (*.level)|*.level|All files (*.*)|*.*'
	SaveDialog.FilterIndex = 1
	if (fso.FolderExists(AppSettings.lvlfolderpath))
		OpenDialog.InitialDir = AppSettings.lvlfolderpath
	else
		OpenDialog.InitialDir = WshShell.SpecialFolders("MyDocuments")
	SaveDialog.Title = 'Save a Level'
	SaveDialog.Filename = tempfile
	SaveDialog.OverwritePrompt = true
	if (!SaveDialog.Execute())
		return 0
	var fullpath = SaveDialog.Filename
	var filetitle = fullpath.slice(fullpath.lastIndexOf('\\') + 1)
	var folderpath = fullpath.slice(0, fullpath.lastIndexOf('\\') + 1)
	var StartTimeFile = new Date()
	previoustable.exportfile = currenttable.exportfile
	currenttable.exportfile = filetitle
	AppSettings.lvlfolderpath = folderpath
	toggleprogresswindow(1)
	var exportluatable = {EasyPatch:0,Branch:0,Spline:0,Ring:0,Globe:0,Shape:0,Spiral:0}
	var TempDistributions = {}, TempTextTable = [], loadwidth = 0, loadincrement = loadbarwidth/12
	var progerr = programerror, pausedo = setTimeout
	function exportfile1()
	{
		try
		{
			doublecheckeverything()
			if (CreatedDate == '')
				CreatedDate = currentdate()
			UpdatedDate = currentdate()
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile2, 0)
		}
		catch (e)
		{
			progerr('There was an error double-checking and correcting parameter values while exporting.', e)
			return 0
		}
	}
	function exportfile2()
	{
		try
		{
			TempDistributions = sortdistributionsexport('Main', {})
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile3, 0)
		}
		catch (e)
		{
			progerr('There was an error sorting distributions while exporting.', e)
			return 0
		}
	}
	// header and players (players could be another chunk...)
	function exportfile3()
	{
		try
		{
			TempTextTable.push
			(
				'-- Created using ', AppTitle, ' ', LatestAppVersion, ' by Mikail\n',
				'AppVersion = "', LatestAppVersion, '"\n',
				'LevelAuthor = "', LevelAuthor, '"\n',
				'CreatedDate = "', CreatedDate, '"\n',
				'UpdatedDate = "', UpdatedDate, '"\n',
				'LevelComments = "', LevelComments, '"\n',
				'levelDesc = "', LevelDescription, '"\n',
				'maxPlayers = ', tablelength(Players), '\n\n'
			)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile4, 0)
		}
		catch (e)
		{
			progerr('There was an error adding the header while exporting.', e)
			return 0
		}
	}
	function exportfile4()
	{
		try
		{
			TempTextTable.push('player = {}\n')
			var playercount = 0
			for (var i in Players)
			{
				var object1 = Players[i]
				TempTextTable.push('player[', playercount, '] = {id = ', playercount, ', name = "' + i + '", resources = ' + object1.StartingRUs[0] + ', raceID = ' + object1.RaceID[0] + ', startPos = ' + object1.StartPos[0] + ',}\n')
				playercount++
			}
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile5, 0)
		}
		catch (e)
		{
			progerr('There was an error adding the players table while exporting.', e)
			return 0
		}
	}
	function exportfile5()
	{
		try
		{
			TempTextTable.push('\nfunction DetermChunk()\n')
			TempTextTable.push('\n\tSOBGroups =\n\t{\n')
			for (var i in SOBGroups)
			{
				TempTextTable.push('\t\t["', i, '"] =\n\t\t{\n')
				var object1 = SOBGroups[i]
				for (var j = 0, n = object1.length; j < n; j++)
				{
					var object2 = object1[j]
					TempTextTable.push('\t\t\t{"', object2[0], '",', object2[1], ',', object2[2], ',', object2[3], ',},\n')
				}
				TempTextTable.push('\t\t},\n')
			}
			TempTextTable.push('\t}\n')
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile6, 0)
		}
		catch (e)
		{
			progerr('There was an error adding the sobgroups table while exporting.', e)
			return 0
		}
	}
	function exportfile6()
	{
		try
		{
			TempTextTable.push('\n\tDistributions = {}\n')
			for (var i in TempDistributions)
			{
				TempTextTable.push('\tDistributions["', i, '"] =\n\t{\n')
				var object1 = TempDistributions[i]
				for (var j = 0, n = object1.length; j < n; j++)
					TempTextTable.push(parseobjectsexport(object1[j]))
				TempTextTable.push('\t}\n')
			}
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile7, 0)
		}
		catch (e)
		{
			progerr('There was an error adding the distributions table while exporting.', e)
			return 0
		}
	}
	function exportfile7()
	{
		try
		{

			TempTextTable.push('\n\tliteralAdd(Distributions["Main"])\n')
			TempTextTable.push('\tdoAllSOBGroups(SOBGroups)\n')
			var TempObject = LevelSettings.setWorldBoundsInner
			TempTextTable.push('\tsetWorldBoundsInner({', TempObject.Position.toString(), '},{', TempObject.Size.toString(), '})\n')
			TempObject = LevelSettings.setWorldBoundsOuter
			TempTextTable.push
			(
				'\tsetWorldBoundsOuter({', TempObject.Position.toString(), '},{', TempObject.Size.toString(), '})\n'
			)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile8, 0)
		}
		catch (e)
		{
			progerr('There was an error parsing the world bounds while exporting.', e)
			return 0
		}
	}
	// paths. can't use tables here because "addPath" doesn't parse them unfortunately
	function exportfile8()
	{
		try
		{
			for (var i in Paths)
			{
				TempTextTable.push('\t-- No way to use a table here like you can with sobgroups.\n')
				TempTextTable.push('\taddPath("', i, '",')
				var object1 = Paths[i]
				for (var j = 0, n = object1.length; j < n; j++)
				{
					var object2 = object1[j]
					var n = object2[1], s = object2[0]
					if (n > 1)
					{
						for (var k = 1; k <= n; k++)
							TempTextTable.push('"', s, '_', k, '",')
					}
					else
						TempTextTable.push('"', s, '",')
				}
				trimlastcomma(TempTextTable)
				TempTextTable[TempTextTable.length] = ')\n'
			}
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile9, 0)
		}
		catch (e)
		{
			progerr('There was an error parsing paths while exporting.', e)
			return 0
		}
	}
	function exportfile9()
	{
		try
		{
			TempTextTable.push
			(
				'end\n\n',
				'function NonDetermChunk()\n',
				parselevelsettingsexport(),
				'end\n\n'
			)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile10, 0)
		}
		catch (e)
		{
			progerr('There was an error parsing level settings while exporting.', e)
			return 0
		}
	}
	function exportfile10()
	{
		try
		{
			var TempPath2 = '.\\source\\lua\\Core.lua'
			var MapFunctionsObject = fso.OpenTextFile(TempPath2, 1, 0)
			TempTextTable.push(MapFunctionsObject.ReadAll(), '\n')
			MapFunctionsObject.Close()
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile11, 0)
		}
		catch (e)
		{
			progerr('There was an error loading "core.lua" while exporting.', e)
			return 0
		}
	}
	function exportfile11()
	{
		for (var i in TempDistributions)
		{
			var object1 = TempDistributions[i]
			for (var j = 0, n = object1.length; j < n; j++)
			{
				var object2 = object1[j]
				var purposetype = object2.Type[0]
				switch (purposetype)
				{
					case 'EasyPatch':
					case 'Branch':
					case 'Spline':
					case 'Ring':
					case 'Globe':
					case 'Shape':
					case 'Spiral':
						try
						{
							if (exportluatable[purposetype] == 0)
							{
								exportluatable[purposetype] = 1
								var TempPath2 = '.\\source\\lua\\' + purposetype + '.lua'
								var MapFunctionsObject = fso.OpenTextFile(TempPath2, 1, 0)
								TempTextTable.push(MapFunctionsObject.ReadAll(), '\n')
								MapFunctionsObject.Close()
							}
						}
						catch (e)
						{
							progerr('There was an error loading "' + purposetype + '.lua" while exporting.', e)
							return 0
						}
					break
				}
			}
		}
		loadwidth += loadincrement
		progressstyle.width = Math.round(loadwidth) + 'px'
		pausedo(exportfile12, 0)
	}
	function exportfile12()
	{
		try
		{
			var ExportFileObject = fso.OpenTextFile(fullpath, 2, 1, 0)
			ExportFileObject.Write(TempTextTable.join(''))
			ExportFileObject.Close()
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			pausedo(exportfile_end, 0)
		}
		catch (e)
		{
			progerr('There was an error writing to the file while exporting.', e)
			return 0
		}
	}
	function exportfile_end()
	{
		toggleprogresswindow(0)
		confirmerror('File exported sucessfully. Duration: ' + gettimediff(StartTimeFile) + 's', 1)
	}
	function exportfile_begin()
	{
		if (!progresswindowopen)
			return 0
		clearInterval(loadwindowtimer)
		exportfile1()
	}
	loadwindowtimer = setInterval(exportfile_begin, 10)
}

// ---------------------------------------------Compiling

function compilefile()
{
	if (childwindowopen || checkunsavedvalues() || checkunsaveddocument())
		return 0
	OpenDialog.Filter = 'Homeworld 2 levels (*.level)|*.level|All files (*.*)|*.*'
	OpenDialog.FilterIndex = 1
	if (fso.FolderExists(AppSettings.lvlfolderpath))
		OpenDialog.InitialDir = AppSettings.lvlfolderpath
	else
		OpenDialog.InitialDir = WshShell.SpecialFolders("MyDocuments")
	OpenDialog.Title = 'Compile a Level'
	OpenDialog.MustExist = true
	if (!OpenDialog.Execute())
		return 0
	var fullpath = OpenDialog.Filename
	var filetitle = fullpath.slice(fullpath.lastIndexOf('\\') + 1)
	var folderpath = fullpath.slice(0, fullpath.lastIndexOf('\\') + 1)
	var StartTimeFile = new Date()
	previoustable.compilefile = currenttable.compilefile
	currenttable.compilefile = filetitle
	AppSettings.lvlfolderpath = folderpath
	try
	{
		var ExecString = '".\\source\\lua\\luac4.exe" -s -o "' + fullpath + 'c" "' + fullpath + '"'
		var CompileFileObject = WshShell.Exec(ExecString)
		var EndTimeFile = new Date()
		var TimeDiff = Math.round((EndTimeFile - StartTimeFile) / 100) / 10
		confirmerror('File compiled sucessfully. Duration: ' + TimeDiff + 's', 1)
	}
	catch (e)
	{
		programerror('There was an error executing the shell command while compiling.', e)
		return 0
	}
}

// ---------------------------------------------User settings

function saveappsettings(imode)
{
	with (AppSettings)
	{
		if ((childwindowopen) && (childwindowid == 'viewingoptions'))
		{
			imageleft = parseInt(childwindow.docGetById('imageleft').value)
			imagetop = parseInt(childwindow.docGetById('imagetop').value)
			imagewidth = parseInt(childwindow.docGetById('imagewidth').value)
			imageheight = parseInt(childwindow.docGetById('imageheight').value)
			jitterx = parseInt(childwindow.docGetById('jitterx').value)
			jittery = parseInt(childwindow.docGetById('jittery').value)
			jitterz = parseInt(childwindow.docGetById('jitterz').value)
		}
	}

	var TempTextTable = ['AppSettings =\r\n{\r\n']
	for (var i in AppSettings)
	{
		var object1 = AppSettings[i]
		if (typeof(object1) == 'string')
			TempTextTable.push('\t', i, ' : "', tosafestring(object1), '",\r\n')
		else
			TempTextTable.push('\t', i, ' : ', object1, ',\r\n')
	}
	trimlastcomma(TempTextTable)
	TempTextTable[TempTextTable.length] = '}\r\n'

	var TempPath = 'settings.ini'
	if (!fso.FileExists(TempPath))
	{
		programerror('Cannot find "settings.ini".')
		return 0
	}
	try
	{
		var SaveFileObject = fso.OpenTextFile(TempPath, 2, 1, 0)
		SaveFileObject.Write(TempTextTable.join(''))
		SaveFileObject.Close()
		if (!imode)
		{
			confirmerror('Settings saved.', 1)
			applyappsettings(0)
		}
	}
	catch (e)
	{
		programerror('There was an error writing to "settings.ini".', e)
		return 0
	}
}

function loadappsettings(imode)
{
	try
	{
		var TempPath = 'settings.ini'
		if (!fso.FileExists(TempPath))
		{
			programerror('File does not exist.')
			return 0
		}
		var LoadFileText = '', LoadFileObject = fso.OpenTextFile(TempPath, 1, 0)
		LoadFileText = LoadFileObject.ReadAll()
		LoadFileObject.Close()
		eval(LoadFileText)
		if (!imode)
			applyappsettings(0)
	}
	catch (e)
	{
		programerror('There was an error loading "settings.ini" and setting the application settings.', e)
		return 0
	}
}

function setdefaultappsettings()
{
	AppSettings = returncopy(DefaultAppSettings)
	applyappsettings(0)
}

function applyappsettings(imode)
{
	with (AppSettings)
	{
		toggleruler(viewruler)
		togglegrid(viewgrid)
		toggleaxes(viewaxes)
		toggledraganddrop(draganddrop)
		toggledropshadow(dropshadow)
		togglestylesheet(stylesheet)
		togglesnaptogrid(snaptogrid)
		togglescaleonzoom(scaleonzoom, 1)
		togglebackground(background)
		updatebgimage()
		if (childwindowopen)
		{
			childwindow.docGetById('imageleft').value = imageleft
			childwindow.docGetById('imagetop').value = imagetop
			childwindow.docGetById('imagewidth').value = imagewidth
			childwindow.docGetById('imageheight').value = imageheight
			childwindow.docGetById('jitterx').value = jitterx
			childwindow.docGetById('jittery').value = jittery
			childwindow.docGetById('jitterz').value = jitterz
		}
	}
	if (imode)
		return 0
	unsetunsavedvalues()
	resizemap()
}

function appendsettings()
{
	with (AppSettings)
	{
		var tempmapwidth = mapwidth
		var tempmapheight = mapheight
		var tempmapfolderpath = mapfolderpath
		var templvlfolderpath = lvlfolderpath
		loadappsettings(1)
		AppSettings.mapwidth = tempmapwidth
		AppSettings.mapheight = tempmapheight
		AppSettings.mapfolderpath = tempmapfolderpath
		AppSettings.lvlfolderpath = templvlfolderpath
		saveappsettings(1)
	}
}

function loadstylesheet(imode)
{
	try
	{
		if (imode == 1)
			var thiswindow = childwindow
		else if (imode == 2)
			var thiswindow = progresswindow
		else
			var thiswindow = window
		if (!thiswindow.document.styleSheets)
			return 0
		if (imode)
			togglestylesheet(AppSettings.stylesheet, thiswindow.document, 1)
		else
		{
			var TempPath = 'settings.ini'
			if (!fso.FileExists(TempPath))
			{
				programerror('File does not exist.')
				return 0
			}
			var LoadFileObject = fso.OpenTextFile(TempPath, 1, 0)
			var LoadFileText = LoadFileObject.ReadAll()
			LoadFileObject.Close()
			eval(LoadFileText)
			togglestylesheet(AppSettings.stylesheet)
		}
	}
	catch (e)
	{
		programerror('There was an error loading "settings.ini" and initializing the stylesheet.', e)
		return 0
	}
}

loadstylesheet(0)
