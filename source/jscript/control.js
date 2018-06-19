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

var AppTitle = 'MissionDude', LatestAppVersion = '1.7.0', activefile = 'Untitled'
document.title = AppTitle + ' ' + LatestAppVersion + ' - ' + activefile
var LevelAuthor = '', LevelComments = '', LevelDescription = 'New Level', Distributions = {}, Paths = {}, SOBGroups = {}, LevelSettings = {}, Players = {}, AppVersion = LatestAppVersion
var AppSettings = {draganddrop : 1, dropshadow : 1, mapfontscale : 1, viewruler : 1, viewgrid : 1, viewaxes : 1, mapzoom : 1, mapwidth : 720, mapheight : 540, scaleonzoom : 1, lvlfolderpath : '.\\maps\\', mapfolderpath : '.\\maps\\', stylesheet : 'Default', gridsize : 1000, snaptogrid : 0, imagetop : 10000, imageleft : 10000, imageheight : 20000, imagewidth : 20000, background : 0, jitterx : 5000, jittery : 5000, jitterz : 5000}
var fso = new ActiveXObject('Scripting.FileSystemObject'), WshShell = new ActiveXObject('WScript.Shell'), OpenDialog = new ActiveXObject('cjDialogs.OpenFile'), SaveDialog = new ActiveXObject('cjDialogs.SaveFile'), osversion = checkosversion(), embedmode = osversion < 6 ? 'window' : 'transparent'
var HTMLDoc, HTMLRoot, hiddenelement, childwindow, progresswindow, progressstyle, EmbedElemXZ, EmbedElemXY, EmbedElemZY, SVGDocXZ, SVGDocXY, SVGDocZY, viewBoxXZ, viewBoxXY, viewBoxZY
var mapcoords = [0,0,0], mapobjectlabels = ['',''], mapunit = 100, mapleft = -2 * mapunit, mapscale = [1,1,1], maptrans = [0,0,0], mapadjustedscale = [1,1,1], mapadjustedcoordinates = [0,0,0], aspectratio = 4/3, winzoom = 0, timerid = 0, legendopen = 0, mouseconstant = 1, leftadjust = 1, widthadjust = 1, snapamount = 1, unitadjust = 20000/mapleft
var childwindowopen = 0, progresswindowopen = 0, childwindowtimer = 0, loadwindowtimer = 0, childwindowid = '', mouseisdown = 0, specialmode = 0, unsavedvalues = 0, unsaveddocument = 0, firstload = 1, throwerrors = 1, loadbarwidth = 250, justloaded = 0
var counttable = {}, currenttable = {}, previoustable = {}, tempobjecttable = {}
var docGetById = document.getElementById, docMakeElem = document.createElement, docMakeText = document.createTextNode

function initialize(StartTimeFile)
{
	toggleprogresswindow(1)
	var loadwidth = 0, loadincrement = loadbarwidth/5
	function initialize1()
	{
		try
		{
			tempobjecttable = {path : [], sobgroup : [], levelsettings : {}, player : {}}
			resetlevelsettings(1)
			blankbasicproperties()
//			unsetunsaveddocument()
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			setTimeout(initialize2, 0)
		}
		catch (e)
		{
			programerror('There was an error during step #1 of initialization.', e)
			return 0
		}
	}
	function initialize2()
	{
		try
		{
			if (firstload)
			{
				HTMLDoc = document
				HTMLRoot = HTMLDoc.documentElement
				HTMLRoot.normalize()
				osversion = checkosversion()

				HTMLDoc.onmouseover = mouseoverproperty
				HTMLDoc.onmouseout = mouseaway
				HTMLDoc.ondblclick = clickagain
				window.onresize = windowresize

				hiddenelement = document.createElement('div')
				hiddenelement.style.cssText = 'position:absolute;left:100px;right:100px;top:-100px;'
				document.body.appendChild(hiddenelement)

				EmbedElemXZ = docGetById('embed_0')
				EmbedElemXY = docGetById('embed_1')
				EmbedElemZY = docGetById('embed_2')
				SVGDocXZ = EmbedElemXZ.getSVGDocument()
				SVGDocXY = EmbedElemXY.getSVGDocument()
				SVGDocZY = EmbedElemZY.getSVGDocument()

				with (AppSettings)
				{
					for (var viewangle = 2; viewangle >= 0; viewangle--)
					{
						var thisdoc = checksvgdocument(viewangle)
						var thisroot = thisdoc.rootElement
						thisroot.normalize()
						thisroot.setAttribute('viewangle',	viewangle)
						thisroot.addEventListener('click',	svgdoconclick, false)
						thisroot.addEventListener('mousemove',	findUserCoord, false)
						thisroot.addEventListener('mouseup',	mouseupobject, false)
						thisroot.addEventListener('SVGZoom',	svgdoconzoom, false)
						thisroot.addEventListener('SVGScroll',	svgdoconscroll, false)
						thisdoc.getElementById('axes' + viewangle).style.setProperty('display', 'block')
						thisdoc.getElementById('statusbox').style.setProperty('display', 'block')
						maptrans[viewangle] = thisroot.currentTranslate
						mapscale[viewangle] = thisroot.currentScale
						mapadjustedscale[viewangle] = scaleonzoom ? mapzoom/mapfontscale/thisroot.currentScale : 1
						if (osversion < 6)
							docGetById('embed_' + viewangle).removeAttribute('wmode')
					}
				}
				windowresize()
				firstload = 0
			}
			else
			{
				unload_elements()
			}
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			setTimeout(initialize3, 0)
		}
		catch (e)
		{
			programerror('There was an error during step #2 of initialization.', e)
			return 0
		}
	}
	function initialize3()
	{
//		try
//		{
			counttable = {object : {}, objectlabel : {}, distribution : 0, distributionlabel : tablelength(Distributions), sobgroup : 0, sobgrouplabel : tablelength(SOBGroups), path : 0, pathlabel : tablelength(Paths), pointedit : 0, pointpool : 0, squadronedit : 0, squadronpool : 0, levelsetting : 0, player : 0, playerlabel : 0}
			currenttable = {object : ['',-1], distribution : 'Main', distributionproperty : '', sobgroup : '', sobgroupproperty : '', path : '', type : '', subtype : '', pointedit : ['',0], pointpool : ['',0], squadronedit : ['',0,0], squadronpool : ['',0,0], levelsetting : '', loadfile : '', savefile : '', deletefile : '', importfile : '', exportfile : '', compilefile : '', player : -1}
			previoustable = {object : ['',-1], distribution : '', distributionproperty : '', sobgroup : '', sobgroupproperty : '', path : '', type : '', subtype : '', pointedit : ['',0], pointpool : ['',0], squadronedit : ['',0,0], squadronpool : ['',0,0], levelsetting : '', loadfile : '', savefile : '', deletefile : '', importfile : '', exportfile : '', compilefile : '', player : -1}
			if (checkdistribution())
				currenttable.object = [Distributions[currenttable.distribution][0].Label[0], 0]

			document.title = AppTitle + ' ' + LatestAppVersion + ' - ' + activefile
			docGetById('levelauthor').value = LevelAuthor
			docGetById('levelcomments').value = LevelComments
			docGetById('leveldescription').value = LevelDescription

			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			setTimeout(initialize4, 0)
//		}
//		catch (e)
//		{
//			programerror('There was an error during step #3 of initialization.', e)
//			return 0
//		}
	}
	function initialize4()
	{
		try
		{
			load_elements()
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			setTimeout(initialize5, 0)
		}
		catch (e)
		{
			programerror('There was an error during step #4 of initialization.', e)
			return 0
		}
	}
	function initialize5()
	{
		try
		{
			applyappsettings(0)
			resetobjectselect(1)
			loadwidth += loadincrement
			progressstyle.width = Math.round(loadwidth) + 'px'
			setTimeout(initialize_end, 0)
		}
		catch (e)
		{
			programerror('There was an error during step #5 of initialization.', e)
			return 0
		}
	}
	function initialize_end()
	{
		toggleprogresswindow(0)
		if (StartTimeFile)
			confirmerror('File loaded and initialized sucessfully. Duration: ' + gettimediff(StartTimeFile) + 's', 1)
	}
	function initialize_begin()
	{
		if (progresswindowopen)
		{
			clearInterval(loadwindowtimer)
			initialize1()
		}
	}
	loadwindowtimer = setInterval(initialize_begin, 10)
}

function load_elements()
{
	makedistributionselect()
	makesobgroupselect()
	makepathselect()
	makelevelsettingsselect()
	makelevelsettingsproperties()
	makeplayersselect()
	makeobjectselect()
}

function unload_elements()
{
	unmakedistributionselect()
	unmakesobgroupselect()
	unmakepathselect()
	unmakelevelsettingsselect()
	unmakelevelsettingsproperties()
	unmakeplayersselect()
	unmakeobjectselect()
	unmakemap()
	if (window.CollectGarbage)
		window.CollectGarbage()
}

function unload_all()
{
	appendsettings()
	unload_elements()
	var inputelements = document.getElementsByTagName('input')
	for (var i = 0, n = inputelements.length; i < n; i++)
	{
		var childelement = inputelements[i]
		childelement.onchange = null
		childelement.onclick = null
		childelement = null
	}
	inputelements = null
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var thisroot = checksvgdocument(viewangle).rootElement
		thisroot.removeEventListener('click',		svgdoconclick, false)
		thisroot.removeEventListener('mousemove',	findUserCoord, false)
		thisroot.removeEventListener('mouseup',		mouseupobject, false)
		thisroot.removeEventListener('SVGZoom',		svgdoconzoom, false)
		thisroot.removeEventListener('SVGScroll',	svgdoconscroll, false)
		thisroot = null
	}
	HTMLDoc.onmouseover = null, HTMLDoc.onmouseout = null, HTMLDoc.ondblclick = null, window.onresize = null
	EmbedElemXZ = null, EmbedElemXY = null, EmbedElemZY = null
	hiddenelement = null, childwindow = null, progresswindow = null, progressstyle = null
	SVGDocXZ = null, SVGDocXY = null, SVGDocZY = null
	HTMLDoc = null, HTMLRoot = null, docGetById = null
	WshShell = null, fso = null
	if (window.CollectGarbage)
		window.CollectGarbage()
}

// ---------------------------------------------Map

function changemapfontsize(imode)
{
	AppSettings.mapfontscale += imode ? -0.1 : 0.1
	resetmap(1)
}

function changemapgridsize(imode)
{
	AppSettings.gridsize *= imode ? 5 : 0.2
	snapamount = AppSettings.snaptogrid ? AppSettings.gridsize : 1
	resetmap(1)
}

function zoommap(imode)
{
	AppSettings.mapzoom += imode ? -0.1 : 0.1
	resizemap()
}

function resizemap()
{
	with (AppSettings)
	{
		aspectratio = mapheight/mapwidth
		widthadjust = mapwidth/720
		leftadjust = mapleft * mapzoom * widthadjust
		for (var viewangle = 2; viewangle >= 0; viewangle--)
		{
			var thisstyle = docGetById('embed_' + viewangle).style
			if ((thisstyle.width != mapwidth + 'px') || (thisstyle.height != mapheight + 'px'))
			{
				thisstyle.width = mapwidth + 'px'
				thisstyle.height = mapheight + 'px'
			}
			var thisdocroot = checksvgdocument(viewangle).documentElement
			thisdocroot.setAttribute('viewBox', (leftadjust) + ' ' + (leftadjust * aspectratio) + ' ' + (-2 * leftadjust) + ' ' + (-2 * leftadjust * aspectratio))
		}
	}
	resetmap(1)
}

function resetmap(imode)
{
	if (unsavedvalues)
		return 0
	mouseconstant = -20000/mapunit * leftadjust
	with (AppSettings)
	{
		for (var viewangle = 2; viewangle >= 0; viewangle--)
		{
			var currentscale = mapscale[viewangle]
			mapadjustedscale[viewangle] = scaleonzoom ? mapzoom/mapfontscale/currentscale : 1
			mapadjustedcoordinates[viewangle] = -mapunit/winzoom/currentscale/mapwidth
		}
	}
	unmakemap()
	makemap()
	if (!imode)
		resetobjectselect()
}

// ---------------------------------------------Objects

function resetobjectselect(imode)
{
	if (!imode)
	{
		previoustable.object = ['', -1]
		unmakeobjectselect()
		makeobjectselect()
	}
	if (checkdistribution())
	{
		selectobject(currenttable.object[0])
		return 0
	}
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var thisdoc = checksvgdocument(viewangle)
		thisdoc.getElementById('selectbox').style.setProperty('display', 'none')
		thisdoc.getElementById('highlightbox').style.setProperty('display', 'none')
	}
}

function addobject(imode)
{
	if (childwindowopen || checkunsavedvalues())
		return 0
	var thisdist = Distributions[currenttable.distribution]
	if (!thisdist)
	{
		warningerror('You must create a distribution before you may add items to it.', 1)
		return 0
	}
	if (checkdistribution() && ((imode == 1) || (imode == 2)))
		var newobject = returncopy(thisdist[currenttable.object[1]])
	else
		var newobject = returncopy(defaultobject)
	var type = newobject.Type[0]
	if (!counttable.object[type])
		counttable.object[type] = 0
	counttable.object[type]++
	if (!counttable.objectlabel[type])
		counttable.objectlabel[type] = 0
	var label = recursiveaddlabel('object', Distributions, type)
//	var amount = newobject.Amount[0]
	newobject.Label = [label]
	if (imode == 1)
		newobject.Translation = returncopy(mapcoords)
	var distlen = thisdist.length
	var listpane = docGetById('objectselect')
	thisdist[distlen] = newobject
	makeappobject(newobject, listpane, distlen, 1)
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var thisdoc = checksvgdocument(viewangle)
		var backelem = thisdoc.getElementById('backlayer')
		var frontelem = thisdoc.getElementById('frontlayer')
		makemapobject(newobject, frontelem, backelem, viewangle)
	}
	setunsaveddocument()
	selectobject(label)
}

function removeobject()
{
	if ((childwindowopen) || (!checkdistribution()))
		return 0
	var thisdist = Distributions[currenttable.distribution]
	var label = currenttable.object[0]
	var count = currenttable.object[1]
	var type = thisdist[count].Type[0]
	counttable.object[type]--
//	counttable.objectlabel[type]--
	thisdist.splice(count, 1)
	var listpane = docGetById('objectselect')
	var listitem = docGetById('select_' + label)
	listpane.removeChild(listitem)
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var thisdoc = checksvgdocument(viewangle)
		var mapitem = thisdoc.getElementById('object_' + label)
		mapitem.parentNode.removeChild(mapitem)
		mapitem = thisdoc.getElementById('area_' + label)
		if (mapitem)
			mapitem.parentNode.removeChild(mapitem)
		if (!checkdistribution())
		{
			thisdoc.getElementById('highlightbox').style.setProperty('display', 'none')
			thisdoc.getElementById('selectbox').style.setProperty('display', 'none')
		}
	}
	previoustable.object = ['', -1]
	if (checkdistribution())
	{
		var prevcount = count - 1
		currenttable.object = thisdist[prevcount] ? [thisdist[prevcount].Label[0], prevcount] : [thisdist[0].Label[0], 0]
		if (tablelength(thisdist) == 1)
		{
			togglebutton(docGetById('objectmenu_3'), 0)
			togglebutton(docGetById('objectmenu_4'), 0)
		}
		selectobject(currenttable.object[0])
	}
	else
	{
		currenttable.object = ['', -1]
		togglebutton(docGetById('objectmenu_1'), 0)
		togglebutton(docGetById('objectmenu_2'), 0)
		disablebasicproperties()
		unmakemoreproperties()
	}
	if (type == 'Squadron')
	{
		for (var i in SOBGroups)
		{
			var object1 = SOBGroups[i]
			for (var j = 0, n = object1.length; j < n; j++)
			{
				var object2 = object1[j]
				if (label == object2[0])
				{
					object1.splice(j, 1)
					break
				}
			}
		}
	}
	else if (type == 'Point')
	{
		for (var i in Paths)
		{
			var object1 = Paths[i]
			for (var j = 0, n = object1.length; j < n; j++)
			{
				var object2 = object1[j]
				if (label == object2[0])
					object1.splice(j, 1)
			}
		}
	}
	setunsaveddocument()
}

function reorderobject(imode)
{
	var thisdist = Distributions[currenttable.distribution]
	if ((childwindowopen) || (tablelength(thisdist) < 2) || (!thisdist))
		return 0
	var thislabel = currenttable.object[0]
	var thisindex = currenttable.object[1]
	if ((imode == 0) && (thisindex > 0))
	{
		var arrayprev = thisdist[thisindex - 1]
		var arraythis = thisdist[thisindex]
		thisdist[thisindex - 1] = arraythis
		thisdist[thisindex] = arrayprev
		var listpane = docGetById('objectselect')
		var thisobject = docGetById('select_' + thislabel)
		var previousobject = docGetById('select_' + arrayprev.Label[0])
		listpane.insertBefore(thisobject, previousobject)
		currenttable.object[1]--
	}
	else if ((imode == 1) && (thisindex < (thisdist.length - 1)))
	{
		var arraythis = thisdist[thisindex]
		var arraynext = thisdist[thisindex + 1]
		var arraynextnext = thisdist[thisindex + 2]
		thisdist[thisindex] = arraynext
		thisdist[thisindex + 1] = arraythis
		var listpane = docGetById('objectselect')
		var thisobject = docGetById('select_' + thislabel)
		if (thisindex < (thisdist.length - 2))
		{
			var nextnextobject = docGetById('select_' + arraynextnext.Label[0])
			listpane.insertBefore(thisobject, nextnextobject)
		}
		else
			listpane.appendChild(thisobject)
		currenttable.object[1]++
	}
	setunsaveddocument()
}

// ---------------------------------------------Basic properties

function editbasicproperties()
{
	if ((childwindowopen) || (!checkdistribution()))
		return 0
	var thisobject = Distributions[currenttable.distribution][currenttable.object[1]]
	var type = thisobject.Type[0]
	var thisproperty = basicpropertytable[type]
	for (var i in thisproperty)
	{
		var lookup1 = thisobject[i]
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
		{
			var arg_object = docGetById('param_' + i + '_' + k)
			var arg_value = lookup1[k]
			arg_object.value = (arg_value == null) ? '' : arg_value
		}
	}
	togglebutton(docGetById('propertymenu_2'), 1)
}

function disablebasicproperties()
{
	if (!checkdistribution())
	{
		blankbasicproperties()
		return 0
	}
	var type = docGetById('param_Type_0').value
	var thisproperty = basicpropertytable[type]
	for (var i in thisproperty)
	{
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
		{
			var thisinput = docGetById('param_' + i + '_' + k)
			if (object1[k])
				togglemiscinput(thisinput, 1)
			else
			{
				togglemiscinput(thisinput, 0)
				thisinput.value = ''
			}
		}
	}
}

function clearbasicproperties()
{
	if ((childwindowopen) || (!checkdistribution()))
		return 0
	var type = docGetById('param_Type_0').value
	var thisproperty = basicpropertytable[type]
	for (var i in thisproperty)
	{
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
			docGetById('param_' + i + '_' + k).value = ''
	}
}

function blankbasicproperties()
{
	var thisproperty = returncopy(nullobject)
	for (var i in thisproperty)
	{
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length;  k < n; k++)
		{
			var thisinput = docGetById('param_' + i + '_' + k)
			if (object1[k])
				togglemiscinput(thisinput, 1)
			else
			{
				togglemiscinput(thisinput, 0)
				thisinput.value = ''
			}
		}
	}
	for (var i = 0; i < 3; i++)
		togglebutton(docGetById('propertymenu_' + i), 0)
}

function filldefaultbasicproperties()
{
	var type = docGetById('param_Type_0').value
	var thisproperty = defaultbasicpropertytable[type]
	for (var i in thisproperty)
	{
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
			docGetById('param_' + i + '_' + k).value = object1[k]
	}
}

// ---------------------------------------------More properties

function editmoreproperties()
{
	if ((childwindowopen) || (!checkdistribution()))
		return 0
	var thisobject = Distributions[currenttable.distribution][currenttable.object[1]]
	var type = thisobject.Type[0]
	var thisproperty = morepropertyhelptable[type]
	for (var i in thisproperty)
	{
		var lookup1 = thisobject[i]
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
		{
			var arg_object = docGetById('param_' + i + '_' + k)
			var arg_value = lookup1[k]
			arg_object.value = (arg_value != null) ? arg_value : ''
		}
	}
}

function clearmoreproperties()
{
	if ((childwindowopen) || (!checkdistribution()))
		return 0
	var type = docGetById('param_Type_0').value
	var thisproperty = morepropertyhelptable[type]
	for (var i in thisproperty)
	{
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
			docGetById('param_' + i + '_' + k).value = ''
	}
}

function filldefaultmoreproperties()
{
	var type = docGetById('param_Type_0').value
	var thisproperty = defaultmorepropertytable[type]
	for (var i in thisproperty)
	{
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
			docGetById('param_' + i + '_' + k).value = object1[k]
	}
}

// ---------------------------------------------All properties

function saveallproperties()
{
	if ((childwindowopen) || (!checkdistribution()))
		return 0
	var currentobject = Distributions[currenttable.distribution][currenttable.object[1]]
	var type_old = currentobject.Type[0]
	var label_old = currentobject.Label[0]
	var type = docGetById('param_Type_0').value
	var label = docGetById('param_Label_0').value
	var amount = parseFloat(docGetById('param_Amount_0').value)
	if (label != label_old)
	{
		for (var j in Distributions)
		{
			var object1 = Distributions[j]
			for (var k = 0, n = object1.length; k < n; k++)
			{
				var object2 = object1[k]
				var templabel = label.replace(/(.*)(_\d+)/, '$1')
				if (templabel == object2.Label[0])
				{
					warningerror('The label you\'ve chosen for this object conflicts with another object. Change it to something else.', 1)
					return 0
				}
			}
		}
		currenttable.object[0] = label
	}
	if (type != type_old)
	{
		counttable.object[type_old]--
//		counttable.objectlabel[type_old]--
		if (!counttable.object[type])
			counttable.object[type] = 0
		counttable.object[type]++
		if (!counttable.objectlabel[type])
			counttable.objectlabel[type] = 0
		counttable.objectlabel[type]++
		if ((type_old == 'Squadron') || (type_old == 'Megalith') || (type_old == 'RvSquadron'))
		{
			if ((type == 'Squadron') || (type == 'Megalith') || (type == 'RvSquadron'))
			{
				var player = parseFloat(docGetById('param_Player_0').value)
				for (var i in SOBGroups)
				{
					var object1 = SOBGroups[i]
					for (var j = 0, n = object1.length; j < n; j++)
					{
						var object2 = object1[j]
						if (label_old == object2[0])
						{
							if (label != object2[0])
								object2[0] = label
							if (amount != object2[1])
								object2[1] = amount
							if (player != object2[2])
								object2[2] = player
							if (type == 'Squadron')
								object2[3] = 0
							else
								object2[3] = 1
							break
						}
					}
				}
			}
			else
			{
				for (var i in SOBGroups)
				{
					var object1 = SOBGroups[i]
					for (var j = 0, n = object1.length; j < n; j++)
					{
						var object2 = object1[j]
						if (label_old == object2[0])
						{
							object1.splice(j, 1)
							break
						}
					}
				}
			}
		}
		else if (type_old == 'Point')
		{
			for (var i in Paths)
			{
				var object1 = Paths[i]
				for (var j = 0, n = object1.length; j < n; j++)
				{
					var object2 = object1[j]
					if (label_old == object2[0])
						object1.splice(j, 1)
				}
			}
		}
	}
	else
	{
		if ((type == 'Squadron') || (type == 'Megalith') || (type == 'RvSquadron'))
		{
			var player = parseFloat(docGetById('param_Player_0').value)
			for (var i in SOBGroups)
			{
				var object1 = SOBGroups[i]
				for (var j = 0, n = object1.length; j < n; j++)
				{
					var object2 = object1[j]
					if (label_old == object2[0])
					{
						if (label != object2[0])
							object2[0] = label
						if (amount != object2[1])
							object2[1] = amount
						if (player != object2[2])
							object2[2] = player
						if (type == 'Squadron')
							object2[3] = 0
						else
							object2[3] = 1
						break
					}
				}
			}
		}
		else if (type == 'Point')
		{
			for (var i in Paths)
			{
				var object1 = Paths[i]
				for (var j = 0, n = object1.length; j < n; j++)
				{
					var object2 = object1[j]
					if (label_old == object2[0])
					{
						if (label != object2[0])
							object2[0] = label
						if (amount != object2[1])
							object2[1] = amount
					}
				}
			}
		}
	}
	var thisproperty = basicpropertytable[type]
	var temptable = {}
	for (var i in thisproperty)
	{
		temptable[i] = []
		var newobj1 = temptable[i]
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
		{
			var object2 = object1[j]
			var arg_value = docGetById('param_' + i + '_' + k).value
			if ((arg_value == '') && (object2))
			{
				warningerror('All the object parameters need to be filled before saving.', 1)
				return 0
			}
			else if ((object2 == 1) || (object2 == 3))
				arg_value = parseFloat(arg_value)
			newobj1[k] = arg_value
		}
	}
	thisproperty = morepropertytable[type]
	for (var i in thisproperty)
	{
		temptable[i] = []
		var newobj1 = temptable[i]
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
		{
			var object2 = object1[k]
			var arg_value = docGetById('param_' + i + '_' + k).value
			if ((arg_value == '') && (object2 != null))
			{
				warningerror('All the object parameters need to be filled before saving.', 1)
				return 0
			}
//			else if (arg_value == 'nil')
//			{
//				warningerror('You must select a distribution before saving this object.', 1)
//				return 0
//			}
			else if ((object2 == 1) || (object2 == 3))
				arg_value = parseFloat(arg_value)
			else if (object2 == 2)
				arg_value = tosafestring(arg_value)
			newobj1[k] = arg_value
		}
	}
	Distributions[currenttable.distribution][currenttable.object[1]] = temptable
	unsetunsavedvalues()
	resetmap(0)
}

function resetallproperties()
{
	if ((childwindowopen) || (!checkdistribution()))
		return 0
	var thisobject = Distributions[currenttable.distribution][currenttable.object[1]]
	var type_old = thisobject.Type[0]
	var label_old = thisobject.Label[0]
	var thisproperty = basicpropertytable[type_old]
	for (var i in thisproperty)
	{
		var lookup1 = thisobject[i]
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
			docGetById('param_' + i + '_' + k).value = lookup1[k]
	}
	unmakemoreproperties()
	makemoreproperties()
	thisproperty = morepropertyhelptable[type_old]
	for (var i in thisproperty)
	{
		var lookup1 = thisobject[i]
		var object1 = thisproperty[i]
		for (var k = 0, n = object1.length; k < n; k++)
			docGetById('param_' + i + '_' + k).value = lookup1[k]
	}
	unsetunsavedvalues()
	resetmap(0)
}

function setdefaultallproperties()
{
	if ((childwindowopen) || (!checkdistribution()))
		return 0
//	filldefaultbasicproperties()
	filldefaultmoreproperties()
	var type = docGetById('param_Type_0').value
	if (subtypetable[type][0])
		docGetById('param_Subtype_0').value = subtypetable[type][0]
	docGetById('param_Amount_0').value = 1
//	saveallproperties()
}

// ---------------------------------------------Types

function savetypeselect(imode)
{
	var oldvalue = docGetById('param_Type_0').value
	var newvalue = currenttable.type
	if ((oldvalue == newvalue) || (imode == 0))
	{
		togglechildwindow(0)
		return 0
	}
	docGetById('param_Type_0').value = newvalue
	var currenttab = subtypetable[newvalue][0]
	if (currenttab)
	{
		currenttable.subtype = currenttab
		docGetById('param_Subtype_0').value = currenttab
	}
	else
		docGetById('param_Subtype_0').value = ''
	disablebasicproperties()
	unmakemoreproperties()
	makemoreproperties()
	filldefaultmoreproperties()
	setunsavedvalues()
	togglechildwindow(0)
}

// ---------------------------------------------Subtypes

function savesubtypeselect(imode)
{
	var oldvalue = docGetById('param_Subtype_0').value
	var newvalue = currenttable.subtype
	if ((oldvalue == newvalue) || (imode == 0))
	{
		togglechildwindow(0)
		return 0
	}
	docGetById('param_Subtype_0').value = newvalue
	setunsavedvalues()
	togglechildwindow(0)
}

// ---------------------------------------------Distributions

function savedistributionpropertyselect(imode)
{
	if (imode)
		savepropertyitem('distribution')
	togglechildwindow(0)
}
function removedistribution()			{Distributions = removeitem('distribution', Distributions, 3); resetmap(0)}
function adddistribution()
{
	Distributions = additem('distribution', Distributions, 3)
	disablebasicproperties()
	unmakemoreproperties()
	resetmap(0)
}
function editdistribution()			{edititem('distribution', Distributions) ? togglechildwindow(1, 'distributionedit') : null}
function savedistribution()			{Distributions = saveitem('distribution', Distributions, 3); resetmap(0)}
function canceldistribution()			{cancelitem('distribution', Distributions)}
function movedistribution(imode)		{Distributions = reorderitem('distribution', Distributions, imode)}

// ---------------------------------------------Sobgroups

function savesobgrouppropertyselect(imode)
{
	if (imode)
		savepropertyitem('sobgroup')
	togglechildwindow(0)
}
function addsobgroup()				{SOBGroups = additem('sobgroup', SOBGroups)}
function removesobgroup()			{SOBGroups = removeitem('sobgroup', SOBGroups)}
function editsobgroup()				{edititem('sobgroup', SOBGroups) ? togglechildwindow(1, 'sobgroupedit') : null}
function savesobgroup()				{SOBGroups = saveitem('sobgroup', SOBGroups)}
function cancelsobgroup()			{cancelitem('sobgroup', SOBGroups)}
function movesobgroup(imode)			{SOBGroups = reorderitem('sobgroup', SOBGroups, imode)}

// ---------------------------------------------Squadrons

function addsquadron(imode)	{SOBGroups = transfersubitem('sobgroup', 'squadron', SOBGroups, imode)}
function movesquadron(imode)	{SOBGroups = reordersubitem('sobgroup', 'squadron', SOBGroups, imode)}

// ---------------------------------------------Paths

function addpath()		{Paths = additem('path', Paths)}
function removepath()		{Paths = removeitem('path', Paths)}
function editpath()		{edititem('path', Paths) ? togglechildwindow(1, 'pathedit') : null}
function savepath()		{Paths = saveitem('path', Paths)}
function cancelpath()		{cancelitem('path', Paths)}
function movepath(imode)	{Paths = reorderitem('path', Paths, imode)}

// ---------------------------------------------Points

function addpoint(imode)	{Paths = transfersubitem('path', 'point', Paths, imode, 1)}
function movepoint(imode)	{Paths = reordersubitem('path', 'point', Paths, imode)}

// ---------------------------------------------Level settings

function savelevelsettings()
{
	LevelSettings = returncopy(tempobjecttable.levelsettings)
	unsetunsavedvalues()
}

function rememberlevelsetting()
{
	var thisitem = window.event.srcElement
	var thissetting = thisitem.getAttribute('setting')
	var thisparam = thisitem.getAttribute('param')
	var thisk = thisitem.getAttribute('k')
	tempobjecttable.levelsettings[thissetting][thisparam][parseFloat(thisk)] = thisitem.value
}

function resetlevelsettings(imode)
{
	tempobjecttable.levelsettings = returncopy(LevelSettings)
	if (imode)
		return 0
	unmakelevelsettingsproperties()
	makelevelsettingsproperties()
	unsetunsavedvalues()
}

function setdefaultlevelsettings()
{
	tempobjecttable.levelsettings = returncopy(defaultlevelsettingstable)
	unmakelevelsettingsproperties()
	makelevelsettingsproperties()
	setunsavedvalues()
}

function updatelevelsettings()
{
	for (var i in defaultlevelsettingstable)
	{
		if (!LevelSettings[i])
			LevelSettings[i] = {}
		var newobj1 = LevelSettings[i]
		var object1 = defaultlevelsettingstable[i]
		for (var j in object1)
		{
			if (!newobj1[j])
				newobj1[j] = []
			var newobj2 = newobj1[j]
			var object2 = object1[j]
			for (var k = 0, n = object2.length; k < n; k++)
			{
				if (newobj2[k] == null)
					newobj2[k] = object2[k]
			}
		}
	}
	var temptable = {}
	for (var i in LevelSettings)
	{
		var lookup1 = defaultlevelsettingstable[i]
		if (lookup1)
		{
			temptable[i] = {}
			var newobj1 = temptable[i]
			var object1 = LevelSettings[i]
			for (var j in object1)
			{
				var lookup2 = lookup1[j]
				if (lookup2)
				{
					newobj1[j] = []
					var newobj2 = newobj1[j]
					var object2 = object1[j]
					for (var k = 0, n = object2.length; k < n; k++)
					{
						if (lookup2[k] != null)
							newobj2[k] = object2[k]
					}
				}
			}
		}
	}
	LevelSettings = temptable
}

//---------------------------------------------------------------------Map Info

function savemapinfo()
{
	LevelAuthor = docGetById('levelauthor').value
	LevelComments = docGetById('levelcomments').value
	LevelDescription = docGetById('leveldescription').value
	unsetunsavedvalues()
}

function resetmapinfo()
{
	docGetById('levelauthor').value = LevelAuthor
	docGetById('levelcomments').value = LevelComments
	docGetById('leveldescription').value = LevelDescription
	unsetunsavedvalues()
}

function setdefaultmapinfo()
{
	docGetById('levelauthor').value = defaultlevelauthor
	docGetById('levelcomments').value = defaultlevelcomments
	docGetById('leveldescription').value = defaultleveldescription
	setunsavedvalues()
}

//---------------------------------------------------------------------Players

function addplayer()		{Players = additem('player', Players, 6)}
function removeplayer()		{Players = removeitem('player', Players, 6)}
function editplayer()		{edititem('player', Players) ? togglechildwindow(1, 'playeredit') : null}
function saveplayer()		{Players = saveitem('player', Players)}
function cancelplayer()		{cancelitem('player', Players)}
function moveplayer(imode)	{Players = reorderitem('player', Players, imode)}
function rememberplayer()
{
	var thisitem = childwindow.event.srcElement
	var thissetting = thisitem.getAttribute('setting')
	var thisparam = thisitem.getAttribute('param')
	var thisk = thisitem.getAttribute('k')
	Players[currenttable.player][thisparam][parseFloat(thisk)] = thisitem.value
}

//---------------------------------------------------------------------Archetypes

function cancelitem(purposetext, purposetable)
{
	purposetable[currenttable[purposetext]] = returncopy(tempobjecttable[purposetext])
	togglechildwindow(0)
}

function edititem(purposetext, purposetable)
{
	if (childwindowopen)
		return	0
	if (!tablelength(purposetable))
	{
		warningerror('You must create a ' + purposetext + ' first before you can edit it.', 1)
		return	0
	}
	if ((purposetext == 'distribution') && (currenttable[purposetext] == 'Main'))
	{
		warningerror('You may not edit the \'Main\' distribution.', 1)
		return 0
	}
	tempobjecttable[purposetext] = returncopy(purposetable[currenttable[purposetext]])
	return 1
}

function removeitem(purposetext, purposetable, imode)
{
	if (childwindowopen)
		return purposetable
	if ((imode == 3) && (currenttable[purposetext] == 'Main'))
	{
		warningerror('You may not remove the \'Main\' ' + purposetext + '.', 1)
		return purposetable
	}
	var tempobject = {}, label = '', thiscount = -1, prevcount = -1
	var listpane = docGetById(purposetext + 'select')
	var object1 = listpane.childNodes
	var currentpurp = currenttable[purposetext]
	var countpurp = counttable[purposetext]
	var matchtext = purposetext + '_' + currentpurp
	for (var i = 0, n = object1.length; i < n; i++)
	{
		if (object1[i].id == matchtext)
		{
			thiscount = i, prevcount = i - 1
			break
		}
	}
	purposetable[currentpurp] = null
	for (var i in purposetable)
	{
		var object1 = purposetable[i]
		if (object1)
		{
			tempobject[i] = object1
			label = i
		}
		else
			currenttable[purposetext] = label
	}
	countpurp = --counttable[purposetext]
	if (countpurp == 1)
	{
		for (var i = 3; i < 5; i++)
			togglebutton(docGetById(purposetext + 'menu_' + i), 0)
	}
	else if (countpurp == 0)
	{
		for (var i = 1; i < 3; i++)
			togglebutton(docGetById(purposetext + 'menu_' + i), 0)
	}
	else if ((imode == 6) && (countpurp == 5))
	{
		togglebutton(docGetById(purposetext + 'menu_0'), 1)
	}
	listpane.removeChild(listpane.childNodes[thiscount])
	var FirstSquad = listpane.childNodes[0]
	var PrevSquad = listpane.childNodes[prevcount]
	if (PrevSquad)
	{
		PrevSquad.className = 'selsel'
		currenttable[purposetext] = PrevSquad.id.substr(purposetext.length + 1)
	}
	else if (FirstSquad)
	{
		FirstSquad.className = 'selsel'
		currenttable[purposetext] = FirstSquad.id.substr(purposetext.length + 1)
	}
	else
		currenttable[purposetext] = ''
	currentpurp = currenttable[purposetext]
	previoustable[purposetext] = ''
	if (imode == 3)
	{
		currenttable.object = checkdistribution() ? [purposetable[currentpurp][0].Label[0], 0] : ['', -1]
		previoustable.object = ['', -1]
	}
	setunsaveddocument()
	return tempobject
}

function additem(purposetext, purposetable, imode)
{
	if (childwindowopen)
		return purposetable
	if ((imode == 6) && (counttable[purposetext] == 6))
	{
		warningerror('You may not create more than six players.', 1)
		return purposetable
	}
	var countpurp = ++counttable[purposetext]
	var label = recursiveaddlabel(purposetext, purposetable)
	if (imode == 6)
		purposetable[label] = returncopy(defaultplayer)
	else
		purposetable[label] = []
	previoustable[purposetext] = currenttable[purposetext]
	currenttable[purposetext] = label
	var currentpurp = currenttable[purposetext]
	if (countpurp == 2)
	{
		for (var i = 3; i < 5; i++)
			togglebutton(docGetById(purposetext + 'menu_' + i), 1)
	}
	else if (countpurp == 1)
	{
		for (var i = 1; i < 3; i++)
			togglebutton(docGetById(purposetext + 'menu_' + i), 1)
	}
	else if ((imode == 6) && (countpurp == 6))
	{
		togglebutton(docGetById(purposetext + 'menu_0'), 0)
	}
	var listpane = docGetById(purposetext + 'select')
	var listitem = document.createElement('div')
	var listtext = document.createTextNode(currenttable[purposetext])
	var oldlistitem = docGetById(purposetext + '_' + previoustable[purposetext])
	listitem.className = 'selsel'
	listitem.id = purposetext + '_' + currenttable[purposetext]
	listitem.onmouseover = eval('focus' + purposetext)
	listitem.onmouseout = eval('unfocus' + purposetext)
	listitem.onclick = eval('select' + purposetext)
	if (oldlistitem)
		oldlistitem.className = 'selout'
	listitem.appendChild(listtext)
	listpane.appendChild(listitem)
	setunsaveddocument()
	return purposetable
}

function reorderitem(purposetext, purposetable, imode)
{
	if ((childwindowopen) || (tablelength(purposetable) < 2))
		return purposetable
	var DistLength = 0, DistCount = 0
	var ThisDist = '', LastDist = '', NextDist = '', NextNextDist = '', CurrentDist = ''
	var TempBool1 = 0, TempBool2 = 0
	var currentpurp = currenttable[purposetext]
	for (var i in purposetable)
	{
		DistLength += 1
		if (TempBool2)
		{
			NextNextDist = i
			TempBool2 = 0
		}
		if (TempBool1)
		{
			NextDist = i
			TempBool1 = 0
			TempBool2 = 1
		}
		if (i == currentpurp)
		{
			DistCount = DistLength
			LastDist = CurrentDist
			ThisDist = i
			TempBool1 = 1
		}
		CurrentDist = i
	}
	var listpane = docGetById(purposetext + 'select')
	var thisdistribution = docGetById(purposetext + '_' + ThisDist)
	var thispurposedist = purposetable[ThisDist]
	if ((imode == 0) && (DistCount > 1))
	{
		var lastpurposedist = purposetable[LastDist]
		var TempObject = {}
		for (var i in purposetable)
		{
			if (i == LastDist)
			{
				TempObject = hashpush(TempObject, ThisDist, thispurposedist)
				TempObject = hashpush(TempObject, LastDist, lastpurposedist)
			}
			else if (i != ThisDist)
				TempObject = hashpush(TempObject, i, purposetable[i])
		}
		var previousdistribution = docGetById(purposetext + '_' + LastDist)
		listpane.insertBefore(thisdistribution, previousdistribution)
		purposetable = TempObject
	}
	else if ((imode == 1) && (DistCount < DistLength))
	{
		var nextpurposedist = purposetable[NextDist]
		var TempObject = {}
		for (var i in purposetable)
		{
			if (i == NextDist)
			{
				TempObject = hashpush(TempObject, NextDist, nextpurposedist)
				TempObject = hashpush(TempObject, ThisDist, thispurposedist)
			}
			else if (i != ThisDist)
				TempObject = hashpush(TempObject, i, purposetable[i])
		}
		if (DistCount < (DistLength - 1))
			listpane.insertBefore(thisdistribution, docGetById(purposetext + '_' + NextNextDist))
		else
			listpane.appendChild(thisdistribution)
		purposetable = TempObject
	}
	setunsaveddocument()
	return purposetable
}

function saveitem(purposetext, purposetable, imode)
{
	var thiswindow = childwindow
	var newsobg = thiswindow.docGetById(purposetext + '_result').value
	var oldsobg = currenttable[purposetext]
	var tempregexp = /\W/g
	if ((purposetext == 'wasdistribution') && (newsobg.match(tempregexp)))
	{
		warningerror('A ' + purposetext + '\'s name may not contain any special characters or spaces. Only letters, numbers and underscores are allowed.', 1)
		return purposetable
	}
	for (var i = 0; i < reservedwords.length; i++)
	{
		if (newsobg == reservedwords[i])
		{
			warningerror('The name you entered is a reserved word. Rename the ' + purposetext + ' to something else.', 1)
			return purposetable
		}
	}
	if ((!newsobg.match(tempregexp)) && (eval('typeof(' + newsobg + ')') !== 'undefined'))
	{
		warningerror('The name you entered is a reserved word. Rename the ' + purposetext + ' to something else.', 1)
		return purposetable
	}
	if (newsobg != oldsobg)
	{
		for (var j in purposetable)
		{
			if (newsobg == j)
			{
				warningerror(toinitialcaps(purposetext) + 's must be uniquely named. This name is already in use.', 1)
				return purposetable
			}
		}
		purposetable[newsobg] = returncopy(purposetable[oldsobg])
		purposetable[oldsobg] = null
	}
	currenttable[purposetext] = newsobg
	var listitem = docGetById(purposetext + '_' + oldsobg)
	listitem.firstChild.nodeValue = newsobg
	listitem.id = purposetext + '_' + newsobg
	if (imode == 3)
		currenttable.object = checkdistribution() ? [purposetable[newsobg][0].Label[0], 0] : ['', -1]
	setunsaveddocument()
	togglechildwindow(0)
	return returncopy(purposetable)
}

function transfersubitem(purposetext, subpurposetext, purposetable, imode, skip)
{
	var thiswindow = childwindowopen ? childwindow : window
	if (imode == 0)
	{
		var subpurpose1 = subpurposetext + 'pool'
		var subpurpose2 = subpurposetext + 'edit'
		var actiontext = 'add'
	}
	else if (imode == 1)
	{
		var subpurpose1 = subpurposetext + 'edit'
		var subpurpose2 = subpurposetext + 'pool'
		var actiontext = 'remove'
	}
	var currentsub1 = currenttable[subpurpose1]
	var currentsub2 = currenttable[subpurpose2]
	var currentpurp = currenttable[purposetext]
	var countsub1 = counttable[subpurpose1]
	var countsub2 = counttable[subpurpose2]
	if (currentsub1 == '')
	{
//		warningerror('There are no more ' + subpurposetext + 's to ' + actiontext + '.', 1)
		return purposetable
	}
	var thislabel = currentsub1[0].substr(0, currentsub1[0].lastIndexOf('_'))
	var thissobgroup = purposetable[currentpurp]
	if (imode == 0)
	{
		if (!skip)
		{
			for (var i = 0, n = thissobgroup.length; i < n; i++)
			{
				var match = thissobgroup[i][0] + '_' + i
				if (match == currentsub1[0])
				{
					warningerror(toinitialcaps(subpurposetext) + ' already exists. Can\'t ' + actiontext + '.', 1)
					return purposetable
				}
			}
			thissobgroup[thissobgroup.length] = [thislabel, currentsub1[1], currentsub1[2], currentsub1[3]]
		}
		else
			thissobgroup[thissobgroup.length] = [thislabel, currentsub1[1]]
	}
	else if (imode == 1)
	{
		for (var i = 0, n = thissobgroup.length; i < n; i++)
		{
			var match = thissobgroup[i][0] + '_' + i
			if (match == currentsub1[0])
			{
				thissobgroup.splice(i, 1)
				break
			}
		}
	}

	var listpane1 = thiswindow.docGetById(subpurpose1 + 'select')
	var listpane2 = thiswindow.docGetById(subpurpose2 + 'select')
	var thissquadron = thiswindow.docGetById(subpurpose1 + '_' + currentsub1[0])
	var thiscount = parseFloat(thissquadron.id.substr(thissquadron.id.lastIndexOf('_') + 1))

	var tempsquadron = null
	if ((!skip) || (imode == 1))
		tempsquadron = thissquadron
	else if (imode == 0)
		tempsquadron = thissquadron.cloneNode(true)

	if ((!skip) || (imode == 0))
	{
		previoustable[subpurpose2] = returncopy(currentsub2)
		currenttable[subpurpose2] = [thislabel + '_' + countsub2, currentsub1[1]]
		currentsub2 = currenttable[subpurpose2]
		if (!skip)
		{
			currentsub2[currentsub2.length] = currentsub1[2]
			currentsub2[currentsub2.length] = currentsub1[3]
		}
		var oldid = previoustable[subpurpose2][0]
		var oldlistitem = thiswindow.docGetById(subpurpose2 + '_' + oldid)
		if (oldlistitem)
			oldlistitem.className = 'selout'
		listpane2.appendChild(tempsquadron)
		tempsquadron.id = subpurpose2 + '_' + currentsub2[0]
		tempsquadron.onmouseover = eval('focus' + subpurpose2)
		tempsquadron.onmouseout = eval('unfocus' + subpurpose2)
		tempsquadron.onclick = eval('select' + subpurpose2)
	}
	else if (imode == 1)
		listpane1.removeChild(tempsquadron)
	if ((!skip) || (imode == 1))
	{
		var CurrentSquad = null
		var CurrentCount = -1
		var children = listpane1.childNodes
		var FirstSquad = children[0]
		for (var i = 0, n = children.length; i < n; i++)
		{
			var thisnode = children[i]
			var thisid = thisnode.id
			var newcount = parseFloat(thisid.substr(thisid.lastIndexOf('_') + 1))
			var newid = thisid.substr(0, thisid.lastIndexOf('_') + 1) + i
			thisnode.id = newid
			if (newcount < thiscount)
			{
				CurrentSquad = thisnode
				CurrentCount = newcount
			}
		}
		if (CurrentSquad)
		{
			CurrentSquad.className = 'selsel'
			var SquadId = CurrentSquad.id
			currenttable[subpurpose1] = [SquadId.substring(SquadId.indexOf('_') + 1, SquadId.lastIndexOf('_') + 1) + CurrentCount, parseFloat(CurrentSquad.getAttribute('Amount'))]
			currentsub1 = currenttable[subpurpose1]
			if (!skip)
			{
				currentsub1[currentsub1.length] = parseFloat(CurrentSquad.getAttribute('Player'))
				currentsub1[currentsub1.length] = parseFloat(CurrentSquad.getAttribute('Reactive'))
			}
		}
		else if (FirstSquad)
		{
			FirstSquad.className = 'selsel'
			var SquadId = FirstSquad.id
			currenttable[subpurpose1] = [SquadId.substring(SquadId.indexOf('_') + 1, SquadId.lastIndexOf('_') + 1) + 0, parseFloat(FirstSquad.getAttribute('Amount'))]
			currentsub1 = currenttable[subpurpose1]
			if (!skip)
			{
				currentsub1[currentsub1.length] = parseFloat(FirstSquad.getAttribute('Player'))
				currentsub1[currentsub1.length] = parseFloat(FirstSquad.getAttribute('Reactive'))
			}
		}
		else
		{
			currenttable[subpurpose1] = ['',0]
			currentsub1 = currenttable[subpurpose1]
			if (!skip)
			{
				currentsub1[currentsub1.length] = 0
				currentsub1[currentsub1.length] = 0
			}
		}
		previoustable[subpurpose1] = ['',0]
		countsub1 = --counttable[subpurpose1]
		if (!skip)
		{
			var previoussub1 = previoustable[subpurpose1]
			previoussub1[previoussub1.length] = 0
			previoussub1[previoussub1.length] = 0
			countsub2 = ++counttable[subpurpose2]
		}
	}
	else if (imode == 0)
		countsub2 = ++counttable[subpurpose2]
	if (imode == 0)
	{
		if (countsub1 == 0)
			togglebutton(thiswindow.docGetById(subpurpose2 + 'menu_0'), 0)
		if (countsub2 == 1)
			togglebutton(thiswindow.docGetById(subpurpose2 + 'menu_1'), 1)
		else if (countsub2 == 2)
		{
			for (var i = 2; i < 4; i++)
				togglebutton(thiswindow.docGetById(subpurpose2 + 'menu_' + i), 1)
		}
	}
	else
	{
		if (countsub2 == 1)
			togglebutton(thiswindow.docGetById(subpurpose1 + 'menu_0'), 1)
		if (countsub1 == 0)
			togglebutton(thiswindow.docGetById(subpurpose1 + 'menu_1'), 0)
		else if (countsub1 == 1)
		{
			for (var i = 2; i < 4; i++)
				togglebutton(thiswindow.docGetById(subpurpose1 + 'menu_' + i), 0)
		}
	}
	return purposetable
}

function reordersubitem(purposetext, subpurposetext, purposetable, imode)
{
	var thiswindow = childwindow
	var subpurpose1 = subpurposetext + 'edit'
	var thissobgroup = purposetable[currenttable[purposetext]]
	var sobgrouplength = thissobgroup.length
	var currentsub1 = currenttable[subpurpose1]
	var currentpurp = currenttable[purposetext]
	if ((sobgrouplength < 2) || (currentsub1[0] == ''))
		return purposetable
	var listpane = thiswindow.docGetById(subpurpose1 + 'select')
	var thissquadron = thiswindow.docGetById(subpurpose1 + '_' + currentsub1[0])
	var thislabel = currentsub1[0].split('_')[0]
	var thiscount = parseFloat(thissquadron.id.substr(thissquadron.id.lastIndexOf('_') + 1))
	var previouscount = -1,	nextcount = -1,	nextnextcount = -1
	var thisindex = -1
	var previouslabel = '', nextlabel = '', nextnextlabel = ''
	var children = listpane.childNodes
	for (var i = 0, n = children.length; i < n; i++)
	{
		var thisnode = children[i]
		var thisid = thisnode.id
		var newcount = parseFloat(thisid.substr(thisid.lastIndexOf('_') + 1))
		var newlabel = thisid.substring(thisid.indexOf('_') + 1, thisid.lastIndexOf('_'))
		if (newcount < thiscount)
		{
			previouscount = newcount
			previouslabel = newlabel
		}
		else if (newcount == thiscount)
			thisindex = i
		else if (i == thisindex + 1)
		{
			nextcount = newcount
			nextlabel = newlabel
		}
		else if (i == thisindex + 2)
		{
			nextnextcount = newcount
			nextnextlabel = newlabel
			break
		}
	}
	if (imode == 0)
	{
		if (thisindex > 0)
		{
			var tempobject = []
			for (var i = 0; i < sobgrouplength; i++)
			{
				if (i == (thisindex - 1))
				{
					tempobject[tempobject.length] = returncopy(thissobgroup[i + 1])
					tempobject[tempobject.length] = returncopy(thissobgroup[i])
				}
				else if (i != thisindex)
					tempobject[tempobject.length] = returncopy(thissobgroup[i])
			}
			var switchid = subpurpose1 + '_' + previouslabel + '_' + previouscount
			var switchsquadron = thiswindow.docGetById(switchid)
			listpane.removeChild(thissquadron)
			listpane.insertBefore(thissquadron, switchsquadron)
			switchsquadron.id = subpurpose1 + '_' + previouslabel + '_' + thiscount
			thissquadron.id = subpurpose1 + '_' + thislabel + '_' + previouscount
			currentsub1[0] = thislabel + '_' + previouscount
			purposetable[currentpurp] = tempobject
		}
	}
	else if (imode == 1)
	{
		if (thisindex < (sobgrouplength - 1))
		{
			var tempobject = []
			for (var i = 0; i < sobgrouplength; i++)
			{
				if (i == (thisindex + 1))
				{
					tempobject[tempobject.length] = returncopy(thissobgroup[i])
					tempobject[tempobject.length] = returncopy(thissobgroup[i - 1])
				}
				else if (i != thisindex)
					tempobject[tempobject.length] = returncopy(thissobgroup[i])
			}
			listpane.removeChild(thissquadron)
			if (thisindex < (sobgrouplength - 2))
			{
				var switchid = subpurpose1 + '_' + nextnextlabel + '_' + nextnextcount
				var switchsquadron = thiswindow.docGetById(switchid)
				listpane.insertBefore(thissquadron, switchsquadron)
			}
			else
				listpane.appendChild(thissquadron)

			var swapid = subpurpose1 + '_' + nextlabel + '_' + nextcount
			var swapsquadron = thiswindow.docGetById(swapid)
			swapsquadron.id = subpurpose1 + '_' + nextlabel + '_' + thiscount
			thissquadron.id = subpurpose1 + '_' + thislabel + '_' + nextcount
			currentsub1[0] = thislabel + '_' + nextcount
			purposetable[currentpurp] = tempobject
		}
	}
	return purposetable
}

function savepropertyitem(purposetext)
{
	var paramid = (purposetext == 'sobgroup') ? 'param_SOBGroup_0' : 'param_Distribution_0'
	var oldvalue = docGetById(paramid).value
	var newvalue = currenttable[purposetext + 'property']
	if (newvalue == '')
		newvalue = 'nil'
	if (oldvalue == newvalue)
		return 0
	docGetById(paramid).value = newvalue
	setunsavedvalues()
}

function blankeverything()
{
	LevelAuthor = '', LevelComments = '', LevelDescription = 'New Level', Distributions = {}, Paths = {}, SOBGroups = {}, LevelSettings = {}, Players = {}, AppVersion = LatestAppVersion
}

function test()
{
	var WshNetwork = new ActiveXObject("WScript.Network")
	var UserDomain = WshNetwork.UserDomain
	var ComputerName =  WshNetwork.ComputerName
	var UserName = WshNetwork.UserName
//	WshShell.run('runas.exe /user:' + UserName + ' cmd.exe')
	prompt(ComputerName + '\\' + UserName, ComputerName + '\\' + UserName)
}

/*
function really()
{
	alert("Really?")
}

window.onbeforeunload = really
window.onerror = really
alert(windows)
*/
