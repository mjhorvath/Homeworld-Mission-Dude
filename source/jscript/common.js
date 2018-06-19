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

function tablelength(ttable)
{
	var icount = 0
	for (var i in ttable)
		icount++
	return icount
}

function hashpush(olditem, newindex, newitem)
{
	var temparray = olditem
	temparray[newindex] = newitem
	return temparray
}

function checkdistribution()
{
	if ((Distributions[currenttable.distribution]) && (Distributions[currenttable.distribution].length > 0))
		return 1
	return 0
}

function checksvgdocument(i)
{
	if (i == 0)		return SVGDocXZ
	else if (i == 1)	return SVGDocXY
	else if (i == 2)	return SVGDocZY
}

function currentdate()
{
	var d = new Date()
	var s = addleadingzeros(d.getMonth() + 1) + '/'+
	addleadingzeros(d.getDate()) + '/'+
	d.getYear()+
	' ' + addleadingzeros(d.getHours()) + ':'+
	addleadingzeros(d.getMinutes()) + ':'+
	addleadingzeros(d.getSeconds())
	return tosafestring(s)
}

function addleadingzeros(fnumber)
{
	if (fnumber < 10)
		fnumber = '0' + fnumber
	return fnumber
}

function setunsavedvalues()
{
	unsavedvalues = 1
	for (var i = 0; i < 2; i++)
		togglebutton(docGetById('propertymenu_' + i), 1)
	setunsaveddocument()
}
function unsetunsavedvalues()
{
	for (var i = 0; i < 2; i++)
		togglebutton(docGetById('propertymenu_' + i), 0)
	unsavedvalues = 0
}
function setunsaveddocument()
{
	unsaveddocument = 1
	togglebutton(docGetById('mainmenu_3'), 1)
}
function unsetunsaveddocument()
{
	unsaveddocument = 0
	togglebutton(docGetById('mainmenu_3'), 0)
	unsetunsavedvalues()
}

function checkunsavedvalues()
{
	if (!unsavedvalues)
		return 0
	var tempbool = warningerror('Some object parameters have changed and need to be saved.\nDiscard the changes and continue anyway?')
	if (tempbool != 6)
		return 1
	unsetunsavedvalues()
	return 0
}

function checkunsaveddocument()
{
	var tempbool = 7
	if (!unsaveddocument)
		return 0
	tempbool = warningerror('The document has not been saved. Disregard and continue anyway?')
	if (tempbool != 6)
		return 1
	return 0
}

function checkemptycontainers()
{
	var emptydistribution = 0, emptysobgroup = 0, emptypath = 0, countstartingpoints = 0, nildistributions = 0, missingsobgroup = 0, unuseddistribution = 0
	var messagetable = [], messagecount = 0
	for (var i in SOBGroups)
	{
		if (!SOBGroups[i].length)
		{
			emptysobgroup = 1
			break
		}
	}
	for (var i in Paths)
	{
		if (!Paths[i].length)
		{
			emptypath = 1
			break
		}
	}
	for (var i in Distributions)
	{
		var object1 = Distributions[i]
		var length1 = object1.length
		if (!length1)
			emptydistribution = 1
		for (var j = 0; j < length1; j++)
		{
			var object2 = object1[j]
			if (object2.Type[0] == 'StartPoint')
			{
				countstartingpoints += object2.Amount[0] * recursiveplayersearch(i)
//				countstartingpoints += 1
			}
			if (object2.Distribution && (object2.Distribution[0] == 'nil'))
				nildistributions = 1
		}
		if (i != 'Main')
		{
			var tempunuseddistribution = 1
			for (var j in Distributions)
			{
				var lookup1 = Distributions[j]
				for (var k = 0, n = lookup1.length; k < n; k++)
				{
					var lookup2 = lookup1[k]
					if (lookup2.Distribution && (lookup2.Distribution[0] == i))
					{
						tempunuseddistribution = 0
						break
					}
				}
				if (!tempunuseddistribution)
					break
			}
			if (tempunuseddistribution)
				unuseddistribution = 1
		}
	}
	if (missingsobgroup)
	{
		warningerror('One or more Reactive Squadrons haven\'t been added to a sobgroup. This error must be corrected before you can continue.', 1)
		return 1
	}
	messagetable.push('There are issues with your map that require your attention before saving:', '\n\n')
	if (nildistributions)
		messagetable.push('', ++messagecount, '. ', 'The "Distribution" parameter of one or more objects (e.g., custom functions) hasn\'t been set.', '\n')
	if (emptydistribution)
		messagetable.push('', ++messagecount, '. ', 'One or more distributions are empty.', '\n')
	if (unuseddistribution)
		messagetable.push('', ++messagecount, '. ', 'One or more distributions aren\'t being utilized by a function.', '\n')
	if (emptysobgroup)
		messagetable.push('', ++messagecount, '. ', 'One or more sobgroups are empty.', '\n')
	if (emptypath)
		messagetable.push('', ++messagecount, '. ', 'One or more paths are empty.', '\n')
	if (tablelength(Players) < 2)
		messagetable.push('', ++messagecount, '. ', 'There are not enough players. There must be at least two.', '\n')
	if (countneededstartingpoints() > countstartingpoints)
		messagetable.push('', ++messagecount, '. ', 'There are not enough starting points. There must be as many starting points as there are players requiring them.', '\n')
	if (messagecount)
	{
		messagetable.push('\n', 'Disregard and continue saving anyway?')
		if (warningerror(messagetable.join('')) == 7)
			return 1
	}
	return 0
}

function countneededstartingpoints()
{
	var countneededpoints = 0
	for (var i in Players)
	{
		if (Players[i].StartPos[0])
			countneededpoints++
	}
	return countneededpoints
}

function arraytostring(purposetable)
{
	var sstring = ''
	for (var i = 0, n = purposetable.length; i < n; i++)
	{
		var object1 = purposetable[i]
		if (typeof(object1) == 'number')
			sstring += object1 + ','
		else if (typeof(object1) == 'string')
			sstring += '"' + object1 + '",'
	}
	return sstring
}

function tosafestring(sstring)
{
	if (sstring.match(/\\\\/))
		return sstring
	return sstring.replace(/\\/g, '\\\\').replace(/\'/g, '\\\'').replace(/\"/g, '\\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t')
}

function toinitialcaps(sstring)
{
	return sstring.substr(0, 1).toUpperCase() + sstring.substr(1)
}

function doublecheckeverything()
{
	var safestr = tosafestring
	var parsefl = parseFloat
	for (var j in Distributions)
	{
		var object1 = Distributions[j]
		for (var k = 0, x = object1.length; k < x; k++)
		{
			var object2 = object1[k]
			var type = object2.Type[0]
			for (var m in object2)
			{
				var object3 = object2[m]
				var basicprop = basicpropertytable[type][m]
				var moreprop = morepropertytable[type][m]
				for (var n = 0, y = object3.length; n < y; n++)
				{
					var object4 = object3[n]
					if (basicprop)
					{
						switch (basicprop[n])
						{
							case 1:
							case 3:
							case 5:
								if (object4 != null)
									object3[n] = parsefl(object4)
							break
							case 2:
							case 4:
								if (object4 != null)
									object3[n] = safestr(object4)
							break
							default:
								object3[n] = null
						}
					}
					else if (moreprop)
					{
						switch (moreprop[n])
						{
							case 1:
							case 3:
							case 5:
								if (object4 != null)
									object3[n] = parsefl(object4)
							break
							case 2:
							case 4:
								if (object4 != null)
									object3[n] = safestr(object4)
							break
							default:
								object3[n] = null
						}
					}
				}
			}
		}
	}
	for (var j in SOBGroups)
	{
		var object1 = SOBGroups[j]
		for (var k in object1)
		{
			var object2 = object1[k]
			for (var m = 0, x = object2.length; m < x; m++)
			{
				var object3 = object2[m]
				switch (typeof(object3))
				{
					case 'string':
						object2[m] = safestr(object3)
					break
					case 'number':
						object2[m] = parsefl(object3)
					break
				}
			}
		}
	}
	for (var j in Paths)
	{
		var object1 = Paths[j]
		for (var k in object1)
		{
			var object2 = object1[k]
			for (var m = 0, x = object2.length; m < x; m++)
			{
				var object3 = object2[m]
				switch (typeof(object3))
				{
					case 'string':
						object2[m] = safestr(object3)
					break
					case 'number':
						object2[m] = parsefl(object3)
					break
				}
			}
		}
	}
	for (var j in LevelSettings)
	{
		var lookup1 = levelsettingstable[j]
		var object1 = LevelSettings[j]
		for (var k in object1)
		{
			var lookup2 = lookup1[k]
			var object2 = object1[k]
			for (var m = 0, x = object2.length; m < x; m++)
			{
				var object3 = object2[m]
				switch (lookup2[m])
				{
					case 1:
					case 3:
					case 5:
						object2[m] = parsefl(object3)
					break
					case 2:
					case 4:
						object2[m] = safestr(object3)
					break
				}
			}
		}
	}
	for (var i in Players)
	{
		var lookup1 = playertable
		var object1 = Players[i]
		for (var k in object1)
		{
			var lookup2 = lookup1[k]
			var object2 = object1[k]
			for (var m = 0, x = object2.length; m < x; m++)
			{
				var object3 = object2[m]
				switch (lookup2[m])
				{
					case 1:
					case 3:
						object2[m] = parsefl(object3)
					break
					case 2:
					case 4:
						object2[m] = safestr(object3)
					break
				}
			}
		}
	}
	LevelAuthor = safestr(LevelAuthor)
	LevelComments = safestr(LevelComments)
	LevelDescription = safestr(LevelDescription)
}

function parsesave(TempObject, level, limit)
{
	var TempTextTable = [], PrefText = '', SuffText = '', BeginText = '', EndText = ''
	if (level < limit)
	{
		SuffText = '\n'
		for (var i = 0; i < level; i ++)
			PrefText += '\t'
		if (level < (limit - 1))
		{
			BeginText = PrefText
			EndText = SuffText
		}
	}
	for (var i in TempObject)
	{
		var TempThing = TempObject[i]
		if (TempThing == null)
			TempTextTable.push(PrefText, 'null,', SuffText)
		else
		{
			if (typeof(TempThing) == 'object')
			{
				if (TempObject.length)
					TempTextTable[TempTextTable.length] = PrefText
				else
				{
					if (((level < (limit - 1)) && (TempObject != LevelSettings)) || ((level < limit) && (TempObject == Players)))
						TempTextTable.push(PrefText, '"', i, '":', EndText, BeginText)
					else
						TempTextTable.push(PrefText, i, ':', EndText, BeginText)
				}
				// not necessarily the case that empty objects are not arrays, but does it matter?
				if (TempThing.length)
					TempTextTable.push('[', EndText, parsesave(TempThing, level + 1, limit), BeginText, '],', SuffText)
				else
					TempTextTable.push('{', EndText, parsesave(TempThing, level + 1, limit), BeginText, '},', SuffText)
			}
			else if (typeof(TempThing) == 'number')
				TempTextTable.push(PrefText, TempThing, ',', SuffText)
			else if (typeof(TempThing) == 'string')
				TempTextTable.push(PrefText, '"', TempThing, '",', SuffText)
			else
				programerror('Encountered a missing type while saving.')
		}
	}
	if (TempObject.length == 0)
		TempTextTable[TempTextTable.length] = ','
	return TempTextTable.join('')
}

function sortdistributionsexport(tablestring, listtable)
{
	var tempdistribution = Distributions[tablestring]
	var thisfunc = sortdistributionsexport
	for (var i = 0, n = tempdistribution.length; i < n; i++)
	{
		var object1 = tempdistribution[i]
		if (object1.Distribution)
			listtable = thisfunc(object1.Distribution[0], listtable)
	}
	listtable[tablestring] = tempdistribution
	return listtable
}

function parseobjectsexport(thisobject)
{
	var type = thisobject.Type[0]
	var TempTextTable = ['\t\t{']

	switch (type)
	{
		case 'Asteroid':
		case 'Salvage':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'"', thisobject.Subtype[0], '",',
				'{', thisobject.Translation.toString(), '},',
				thisobject.RUValue[0], ',',
				thisobject.Unknown1[0], ',',
				thisobject.Unknown2[0], ',',
				thisobject.Unknown3[0], ',',
				thisobject.Unknown4[0], ','
			)
		break
		case 'EasyPatch':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'easyPatch,',
				'{', thisobject.Translation.toString(), '},',
				thisobject.RUValue[0], ','
			)
		break
		case 'Cloud':
		case 'DustCloud':
		case 'Nebula':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'"', thisobject.Name[0], '",',
				'"', thisobject.Subtype[0], '",',
				'{', thisobject.Translation.toString(), '},',
				'{', thisobject.Color.toString(), '},',
				thisobject.Unknown1[0], ',',
				thisobject.Radius[0], ','
			)
		break
		case 'Squadron':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable['Squadron'], '",',
				'"', thisobject.Name[0], '",',
				'"', thisobject.Subtype[0], '",',
				'{', thisobject.Translation.toString(), '},',
				thisobject.Player[0], ',',
				'{', thisobject.Rotation.toString(), '},',
				thisobject.Unknown1[0], ',',
				thisobject.Hyperspace[0], ','
			)
		break
		case 'StartPoint':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'nil,',
				'{', thisobject.Translation.toString(), '},',
				'{', thisobject.Rotation.toString(), '},'
			)
		break
		case 'Pebble':
		case 'RvResource':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'"', thisobject.Subtype[0], '",',
				'{', thisobject.Translation.toString(), '},',
				thisobject.Unknown1[0], ',',
				thisobject.Unknown2[0], ',',
				thisobject.Unknown3[0], ','
			)
		break
		case 'Branch':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'branchAdd,',
				'{', thisobject.Translation.toString(), '},',
				'Distributions["', thisobject.Distribution[0], '"],',
				'{',
				'{', thisobject.Divisions.toString(), '},',
				'{', thisobject.Intervals.toString(), '},',
				'{', thisobject.Frequency.toString(), '},',
				'{', thisobject.Beginning.toString(), '},',
				'{', thisobject.Ending.toString(), '},',
				'{', thisobject.Radii.toString(), '},',
				'{', thisobject.Lengths.toString(), '},',
				'{', thisobject.Thicknesses.toString(), '},',
				'{', thisobject.Angles.toString(), '},',
				thisobject.Mode[0], ',',
				'},',
				'{', thisobject.Rotation.toString(), '},'
			)
		break
		case 'Spline':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'splineAdd,',
				'{', thisobject.Translation.toString(), '},',
				'Distributions["', thisobject.Distribution[0], '"],',
				'{',
				'{', thisobject.Point1A.toString(), '},',
				'{', thisobject.Point1B.toString(), '},',
				'{', thisobject.Point2A.toString(), '},',
				'{', thisobject.Point2B.toString(), '},',
				'{', thisobject.Radii.toString(), '},',
				'{', thisobject.Thicknesses.toString(), '},',
				'},',
				'{', thisobject.Rotation.toString(), '},'
			)
		break
		case 'Ring':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'ringAdd,',
				'{', thisobject.Translation.toString(), '},',
				'Distributions["', thisobject.Distribution[0], '"],',
				'{',
				thisobject.Axis1[0], ',',
				thisobject.Axis2[0], ',',
				thisobject.Thickness[0], ',',
				thisobject.Height[0], ',',
				'{', thisobject.Arc.toString(), '},',
				thisobject.Mode[0], ',',
				'},',
				'{', thisobject.Rotation.toString(), '},'
			)
		break
		case 'Globe':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'globeAdd,',
				'{', thisobject.Translation.toString(), '},',
				'Distributions["', thisobject.Distribution[0], '"],',
				'{',
				thisobject.Radius[0], ',',
				thisobject.Latitude[0], ',',
				thisobject.Longitude[0], ',',
				thisobject.Thickness[0], ',',
				thisobject.Height[0], ',',
				'{', thisobject.Arc.toString(), '},',
				thisobject.Mode[0], ',',
				'},',
				'{', thisobject.Rotation.toString(), '},'
			)
		break
		case 'Shape':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'shapeAdd,',
				'{', thisobject.Translation.toString(), '},',
				'Distributions["', thisobject.Distribution[0], '"],',
				'{',
				'"', thisobject.Subtype[0], '",',
				thisobject.ParamA[0], ',',
				thisobject.ParamB[0], ',',
				thisobject.ParamC[0], ',',
				thisobject.ParamD[0], ',',
				thisobject.ParamE[0], ',',
				'},',
				'{', thisobject.Rotation.toString(), '},'
			)
		break
		case 'Spiral':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'spiralAdd,',
				'{', thisobject.Translation.toString(), '},',
				'Distributions["', thisobject.Distribution[0], '"],',
				'{',
				'"', thisobject.Subtype[0], '",',
				thisobject.Radius[0], ',',
				thisobject.Arms[0], ',',
				thisobject.Revolutions[0], ',',
				thisobject.Angle[0], ',',
				thisobject.Height[0], ',',
				thisobject.Width[0], ',',
				thisobject.Thickness[0], ',',
				'{', thisobject.TValues.toString(), '},',
				thisobject.Mode[0], ',',
				'},',
				'{', thisobject.Rotation.toString(), '},'
			)
		break
		case 'Literal':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'literalAdd,',
				'Distributions["', thisobject.Distribution[0], '"],'
			)
		break
		case 'Camera':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'"', thisobject.Name[0], '",',
				'{', thisobject.Translation.toString(), '},',
				'{', thisobject.Target.toString(), '},'
			)
		break
		case 'Point':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'"', thisobject.Name[0], '",',
				'{', thisobject.Translation.toString(), '},',
				'{', thisobject.Rotation.toString(), '},'
			)
		break
		case 'Sphere':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'"', thisobject.Name[0], '",',
				'{', thisobject.Translation.toString(), '},',
				thisobject.Radius[0], ','
			)
		break
		case 'DirLight':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'"', thisobject.Name[0], '",',
				'{', thisobject.Translation.toString(), '},',
				'{', thisobject.Color.toString(), '},',
				'{', thisobject.Specular.toString(), '},'
			)
		break
		case 'RvSquadron':
			TempTextTable.push
			(
				thisobject.Amount[0], ',',
				'"', thisobject.Label[0], '",',
				'"', mapobjecttable[type], '",',
				'"', thisobject.Subtype[0], '",',
				'{', thisobject.Translation.toString(), '},',
				thisobject.Player[0], ',',
				thisobject.Unknown1[0], ',',
				thisobject.Unknown2[0], ',',
				thisobject.Unknown3[0], ',',
				thisobject.Unknown4[0], ','
			)
		break
	}
	TempTextTable[TempTextTable.length] = '},\n'
	return TempTextTable.join('')
}

function parselevelsettingsexport()
{
	var TempObject = null
	var TempTextTable = ['\tfogSetActive(', LevelSettings.fogSetActive.Enable[0], ')\n']
	TempObject = LevelSettings.fogAddInterpolator
	TempTextTable.push('\tfogAddInterpolator("', TempObject.Buffer[0], '",', TempObject.Length[0], ',', TempObject.Target[0], ')\n')
	TempObject = LevelSettings.fogSetColour
	TempTextTable.push('\tfogSetColour(', TempObject.R[0], ',', TempObject.G[0], ',', TempObject.B[0], ',', TempObject.A[0], ')\n',
	'\tfogSetDensity(', LevelSettings.fogSetDensity.Density[0], ')\n',
	'\tfogSetStart(', LevelSettings.fogSetStart.Start[0], ')\n',
	'\tfogSetEnd(', LevelSettings.fogSetEnd.End[0], ')\n',
	'\tfogSetType("', LevelSettings.fogSetType.Type[0], '")\n',
	'\tsetFXWind({', LevelSettings.setFXWind.Vector.toString(), '})\n',
	'\tloadBackground("', LevelSettings.loadBackground.Path[0], '")\n',
	'\tsetDefaultMusic("Data:sound\\\\music\\\\', LevelSettings.setDefaultMusic.Folder[0], '\\\\', LevelSettings.setDefaultMusic.TrackName[0], '")\n')
	TempObject = LevelSettings.setDustCloudAmbient
	TempTextTable.push('\tsetDustCloudAmbient({', TempObject.AmbientColor.toString(), '})\n')
	TempObject = LevelSettings.setNebulaAmbient
	TempTextTable.push('\tsetNebulaAmbient({', TempObject.AmbientColor.toString(), '})\n',
	'\tsetGlareIntensity(', LevelSettings['setGlareIntensity'].Intensity[0], ')\n')
	TempObject = LevelSettings.setLevelShadowColour
	TempTextTable.push('\tsetLevelShadowColour(', TempObject.R[0], ',', TempObject.G[0], ',', TempObject.B[0], ',', TempObject.A[0], ')\n')
	TempObject = LevelSettings.setSensorsManagerCameraDistances
	TempTextTable.push('\tsetSensorsManagerCameraDistances(', TempObject.MinDistance[0], ',', TempObject.MaxDistance[0], ')\n',
	'\trandomMusic(', LevelSettings.randomMusic.Mode[0], ')\n',
	'\trandomBackground(', LevelSettings.randomBackground.Mode[0], ')\n')
	return TempTextTable.join('')
}

function recursiveaddlabel(purposetext, purposetable, purposetype)
{
	var label = ''
	var thisfunc = recursiveaddlabel
	if (purposetype)
	{
		var countlabel = ++counttable[purposetext + 'label'][purposetype]
		switch (purposetype)
		{
			case 'RvSquadron':
				label = 'Rv. Squadron' + ' #' + countlabel
			break
			case 'RvAsteroid':
				label = 'Rv. Asteroid' + ' #' + countlabel
			break
			default:
				label = purposetype + ' #' + countlabel
			break
		}
		for (var i in purposetable)
		{
			var object1 = purposetable[i]
			for (var j = 0, n = object1.length; j < n; j++)
			{
				if (object1[j].Label[0] == label)
					return thisfunc(purposetext, purposetable, purposetype)
			}
		}

	}
/*
	else if (purposetext == 'wasdistribution')
	{
		var countlabel = ++counttable[purposetext + 'label']
		label = toinitialcaps(purposetext) + '_' + countlabel
		for (var i in purposetable)
		{
			if (i == label)
				return thisfunc(purposetext, purposetable)
		}
	}
*/
	else
	{
		var countlabel = ++counttable[purposetext + 'label']
		label = toinitialcaps(purposetext) + ' #' + countlabel
		for (var i in purposetable)
		{
			if (i == label)
				return thisfunc(purposetext, purposetable)
		}
	}
	return label
}

function recursivedistributionsearch(purposematch, purposetable)
{
	var thisfunc = recursivedistributionsearch
	var temptable1 = {}, temptable2 = {}
	for (var i in purposetable)
	{
		temptable1[i] = []
		var object1 = purposetable[i]
		for (var j = 0, n = object1.length; j < n; j++)
		{
			var object2 = object1[j]
			temptable1[i][j] = object2
			if ((object2.Distribution) && (object2.Distribution[0] == purposematch))
			{
				temptable1 = thisfunc(i, purposetable)
				break
			}
		}
	}
	if (!temptable1[purposematch])
	{
//		warningerror('There are no distributions to select.', 1)
		return {}
	}
	temptable1[purposematch] = null
	for (var i in temptable1)
	{
		if (temptable1[i])
			temptable2[i] = purposetable[i]
	}
	return temptable2
}

function recursiveplayersearch(purposematch)
{
	var thisfunc = recursiveplayersearch, tempcount = 0
	for (var i in Distributions)
	{
		var object1 = Distributions[i]
		for (var j = 0, n = object1.length; j < n; j++)
		{
			var object2 = object1[j]
			if (object2.Distribution && (object2.Distribution[0] == purposematch))
				tempcount += object2.Amount[0] * thisfunc(i)
		}
	}
	return Math.max(tempcount, 1)
}

function returncopy(thisthing)
{
	var thisfunc = returncopy, thislen = thisthing.length, nocount = 0
	if (typeof(thisthing) == 'object')
		var newthing = (thislen != null) ? [] : {}
	else
		var newthing = thisthing
	for (var i in thisthing)
	{
		var object1 = thisthing[i]
		if (thislen != null)
		{
			if (object1 != null)
				newthing[i - nocount] = thisfunc(object1)
			else
				nocount++
		}
		else if (object1 != null)
			newthing[i] = thisfunc(object1)
	}
	return newthing
}

function testalert(messagetext)
{
	WshShell.Popup(messagetext, 0, 'Program error:', 0 + 48)
}

function programerror(messagetext, e)
{
	WshShell.Popup(messagetext, 0, 'Program error:', 0 + 48)
	progresswindowopen ? toggleprogresswindow(0) : null
	childwindowopen ? togglechildwindow(0) : null
	if (e && throwerrors)
		throw e
}

function programerrorplain(messagetext, e)
{
	if (0)
	{
		messagetext += '\n\n'
		for (var i in e)
		{
			switch (i)
			{
				case 'description':
					messagetext += 'Error:\t\t' + e[i] + '\n'
				break
				case 'number':
					messagetext += 'Code:\t\t' + (e[i] & 0xffff) + '\n'
//					messagetext += 'Facility:\t\t' + (e[i]>>16 & 0x1fff) + '\n'
				break
				case 'message':
				break
				case 'name':
					messagetext += 'Type:\t\t' + e[i] + '\n'
				break
			}
		}
	}
	WshShell.Popup(messagetext, 0, 'Program error:', 0 + 48)
	if (e && throwerrors)
		throw e
}

function warningerror(messagetext, imode)
{
	if (imode)
		WshShell.Popup(messagetext, 0, 'Warning:', 0 + 16)
	else
		return WshShell.Popup(messagetext, 0, 'Warning:', 4 + 16)
}

function confirmerror(messagetext, imode)
{
	if (imode)
		WshShell.Popup(messagetext, 0, 'Confirm:', 0 + 64)
	else
		return WshShell.Popup(messagetext, 0, 'Confirm:', 4 + 32)
}

function trimlastcomma(TempText)
{
	var thislen = TempText.length, thistyp = typeof(TempText)
	if (thistyp == 'string')
		return TempText.substring(0, TempText.lastIndexOf(',')) + TempText.substring(TempText.lastIndexOf(',') + 1, thislen)
	else if ((thistyp == 'object') && thislen)
	{
		TempText[thislen - 1] = trimlastcomma(TempText[thislen - 1])
		return TempText
	}
	return TempText
}

function removeelements(parentobject)
{
	while (parentobject.hasChildNodes())
	{
		var childobject = parentobject.lastChild
		if (parentobject.tagName == 'HTML')
		{
			childobject.onclick = null
			childobject.onmouseover = null
			childobject.onmouseout = null
			childobject.onmousemove = null
			childobject.onmousedown = null
			childobject.onmouseup = null
		}
		else if (parentobject.tagName == 'g')
		{
			childobject.removeEventListener('click', mouseclickobject, 0)
			childobject.removeEventListener('mouseover', mouseoverobject, 0)
			childobject.removeEventListener('mouseout', mouseoutobject, 0)
			childobject.removeEventListener('mousedown', mousedownobject, 0)
		}
		parentobject.removeChild(childobject)
		childobject = null
	}
}

function setstatustext(text)
{
	var thiswindow = docGetById('status') ? window : pw
	thiswindow.docGetById('status').firstChild.nodeValue = text
}

function resetstatustext()
{
	var thiswindow = docGetById('status') ? window : pw
	thiswindow.docGetById('status').firstChild.nodeValue = 'Status text...'
}

function gettimediff(starttime)
{
	return Math.round((new Date() - starttime)/100)/10
}

function checkosversion()
{
	try		{var strOS = WshShell.RegRead("HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\CurrentVersion")}
	catch (e)	{}
	try		{var strOS = WshShell.RegRead("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\VersionNumber")}
	catch (e)	{}
	return strOS
}
