// Copyright (C) 2018  Michael Horvath
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

// ---------------------------------------------App Objects

function makeappobject(thisobject, listpane, i, imode)
{
	var amount = thisobject.Amount[0]
	var label = thisobject.Label[0]
	var type = thisobject.Type[0]
	if (imode == 2)
	{
		if (!counttable.object[type])
			counttable.object[type] = 0
		counttable.object[type]++
		if (!counttable.objectlabel[type])
			counttable.objectlabel[type] = 0
		counttable.objectlabel[type]++
	}
	var listitem = docMakeElem('div')
	var listtext = docMakeText()
	if ((type == 'Squadron') || (type == 'RvSquadron'))
	{
		var player = thisobject.Player[0]
		var squadtype = (type == 'RvSquadron') ? 1 : 0
		listtext.nodeValue = label + ' [' + amount + ',' + player + ',' + squadtype + ']'
		listitem.setAttribute('title', '[amt,plyr,react]')
	}
	else
	{
		listtext.nodeValue = label + ' [' + amount + ']'
		listitem.setAttribute('title', '[amt]')
	}
	listitem.setAttribute('id', 'select_' + label)
	listitem.className = 'selout'
	listitem.onmouseover = focusappobject
	listitem.onmouseout = unfocusappobject
	listitem.onclick = selectappobject
	listitem.appendChild(listtext)
	listpane.appendChild(listitem)
	if (i == 0)
	{
		togglebutton(docGetById('objectmenu_1'), 1)
		togglebutton(docGetById('objectmenu_2'), 1)
	}
	else if (i == 1)
	{
		togglebutton(docGetById('objectmenu_3'), 1)
		togglebutton(docGetById('objectmenu_4'), 1)
	}
}

function makeobjectselect()
{
	var thisdist = Distributions[currenttable.distribution]
	if (!thisdist)
		return 0
	var listpane = docGetById('objectselect')
	var subfunction = makeappobject
	var distlen = thisdist.length
	var i = 0, n = distlen % 8
	while (n--)
		subfunction(thisdist[i], listpane, i++)
	n = parseInt(distlen/8)
	while (n--)
	{
		subfunction(thisdist[i], listpane, i++)
		subfunction(thisdist[i], listpane, i++)
		subfunction(thisdist[i], listpane, i++)
		subfunction(thisdist[i], listpane, i++)
		subfunction(thisdist[i], listpane, i++)
		subfunction(thisdist[i], listpane, i++)
		subfunction(thisdist[i], listpane, i++)
		subfunction(thisdist[i], listpane, i++)
	}
}
function unmakeobjectselect()
{
	removeelements(docGetById('objectselect'))
	for (var i = 3; i > 0; i--)
		togglebutton(docGetById('objectmenu_' + i), 0)
}

// ---------------------------------------------Map & Map Objects

function makemapobject(thisobject, frontelem, backelem, viewangle, i)
{
	var thisdoc = checksvgdocument(viewangle)
	var type = thisobject.Type[0]
	var subtype = thisobject.Subtype[0]
	var amount = thisobject.Amount[0]
	var label = thisobject.Label[0]
	var maptype = mapobjecttable[type]
	var trans = thisobject.Translation
	var adjustedscale = mapadjustedscale[viewangle]
	switch (viewangle)
	{
		case 0:
			var coox = trans[0]/unitadjust, cooy = trans[2]/unitadjust
		break
		case 1:
			var coox = trans[0]/unitadjust, cooy = trans[1]/unitadjust
		break
		case 2:
			var coox = trans[2]/unitadjust, cooy = trans[1]/unitadjust
		break
	}
	var thistransform = 'matrix(' + adjustedscale + ' 0 0 ' + adjustedscale + ' ' + coox + ' ' + cooy + ')'
	var thisnode = thisdoc.getElementById(maptype + '_proto').cloneNode(true)
	thisnode.setAttribute('transform', thistransform)
	thisnode.id = 'object_' + label
	switch (type)
	{
		case 'Squadron':
		case 'RvSquadron':

			var player = thisobject.Player[0]
			var squadtype = (type == 'RvSquadron') ? 1 : 0
			thisnode.setAttribute('Info', '[' + amount + ',' + player + ',' + squadtype + ']')
		break
		case 'Cloud':
		case 'DustCloud':
		case 'Nebula':
		case 'Sphere':
			var radius = thisobject.Radius[0]/-unitadjust/adjustedscale
			var defaultopacity = 1/6
			var inv_defaultopacity = 1 - defaultopacity
			var opacity = defaultopacity
			for (var j = 1; j < amount; j++)
				opacity = 1 - (1 - opacity) * inv_defaultopacity
			var areanode = thisdoc.getElementById(maptype + '_area').cloneNode(true)
			areanode.setAttribute('transform', thistransform)
			areanode.id = 'area_' + label
			areanode.setAttribute('r', radius)
			areanode.style.setProperty('fill-opacity', opacity)
			backelem.appendChild(areanode)
			thisnode.setAttribute('Info', '[' + amount + ']')
		break
		default:
			thisnode.setAttribute('Info', '[' + amount + ']')
		break
	}
	thisnode.addEventListener('click', mouseclickobject, false)
	thisnode.addEventListener('mouseover', mouseoverobject, false)
	thisnode.addEventListener('mouseout', mouseoutobject, false)
	thisnode.addEventListener('mousedown', mousedownobject, false)
	frontelem.appendChild(thisnode)
	if (i == currenttable.object[1])
	{
		thisdoc.getElementById('selectbox').setAttribute('transform', thistransform)
		thisdoc.getElementById('highlightbox').setAttribute('transform', thistransform)
	}
}

function makemap()
{
	var thisdist = Distributions[currenttable.distribution]
	if (thisdist)
		var distlen = thisdist.length
	var gridunit = AppSettings.gridsize / mapunit
	var gridunit2 = gridunit * 2
	var axesscale = AppSettings.mapfontscale * widthadjust
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var adjustedscale = mapadjustedscale[viewangle]
		var scale = 'scale(' + (adjustedscale) + ')'
		var thisdoc = checksvgdocument(viewangle)
		var thisroot = thisdoc.rootElement
		var listelem = thisdoc.getElementById('frontlayer')
		var backelem = thisdoc.getElementById('backlayer')
		if (thisdist)
		{
			var subfunction = makemapobject
			var i = 0, n = distlen % 8
			while (n--)
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
			n = parseInt(distlen/8)
			while (n--)
			{
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
				subfunction(thisdist[i], listelem, backelem, viewangle, i++)
			}
		}
		var coo = mapleft * axesscale
		thisdoc.getElementById('px' + viewangle).setAttribute('d', 'M0,0 L' + coo + ',0')
		coo *= aspectratio
		thisdoc.getElementById('py' + viewangle).setAttribute('d', 'M0,0 L0,' + coo)
		coo = (mapleft - mapleft/10) * axesscale
		thisdoc.getElementById('tx' + viewangle).setAttribute('x', coo)
		coo *= aspectratio
		thisdoc.getElementById('ty' + viewangle).setAttribute('y', coo)
		var ruleunit = mapunit * 1/adjustedscale
		if (thisdoc.getElementById('c1').getAttribute('r') != ruleunit)
		{
			for (var i = 10; i > 0; i--)
			{
				coo = i * ruleunit
				thisdoc.getElementById('c' + i).setAttribute('r', coo)
				if ((i == 10) && (mapscale[viewangle] >= 16))
				{
					thisdoc.getElementById('ta' + i).style.setProperty('display', 'none')
					thisdoc.getElementById('tc' + i).style.setProperty('display', 'none')
				}
				else
				{
					thisdoc.getElementById('ta' + i).setAttribute('x', coo)
					thisdoc.getElementById('tc' + i).setAttribute('y', coo)
					if (i == 10)
					{
						thisdoc.getElementById('ta' + i).style.setProperty('display', 'block')
						thisdoc.getElementById('tc' + i).style.setProperty('display', 'block')
					}
				}
				coo *= -1
				thisdoc.getElementById('tb' + i).setAttribute('x', coo)
				thisdoc.getElementById('td' + i).setAttribute('y', coo)
			}
			coo = 10 * ruleunit
			thisdoc.getElementById('rulepath').setAttribute('d', 'M0,0 L' + coo + ',0 M0,0 L' + -coo + ',0 M0,0 L0,' + coo + ' M0,0 L0,' + -coo)
			thisdoc.getElementById('rule').setAttribute('transform', scale)
			thisdoc.getElementById('axes').setAttribute('transform', scale)
		}
		var griditem = thisdoc.getElementById('grid_pttn')
		if (griditem.getAttribute('width') != gridunit2)
		{
			griditem.setAttribute('width', gridunit2)
			griditem.setAttribute('height', gridunit2)
			thisdoc.getElementById('grid_sub').setAttribute('d', 'M0,0 L' + gridunit + ',0 L' + gridunit + ',' + gridunit + ' L0,' + gridunit + ' Z M' + gridunit + ',' + gridunit + ' L' + gridunit2 + ',' + gridunit + ' L' + gridunit2 + ',' + gridunit2 + ' L' + gridunit + ',' + gridunit2 + ' Z')
		}
		updatelegend(viewangle)
	}
}

function unmakemap()
{
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var thisdoc = checksvgdocument(viewangle)
		removeelements(thisdoc.getElementById('frontlayer'))
		removeelements(thisdoc.getElementById('backlayer'))
	}
}

// ---------------------------------------------Properties

function makemoreproperties()
{
	var listpane = docGetById('morepropertieslist')
	var type = docGetById('param_Type_0').value
	var desc1 = morepropertyhelptable[type], type1 = morepropertytable[type]
	if (docGetById('2_0_but').getAttribute('disabled') == true)
		togglebutton(docGetById('2_1_but'), tablelength(type1) > 0 ? 1 : 0)
	for (var i in desc1)
	{
		var divitem = docMakeElem('div')
		var labelitem = docMakeElem('label')
		var labeltext = docMakeText(i + ':')
		labelitem.setAttribute('id', 'label_' + i)
		labelitem.appendChild(labeltext)
		divitem.appendChild(labelitem)
		var desc2 = desc1[i], type2 = type1[i]
		for (var k = 0, n = desc2.length; k < n; k++)
		{
			var arg_desc = desc2[k], arg_type = type2[k]
			var fielditem = docMakeElem('input')
			fielditem.setAttribute('desc', arg_desc)
			fielditem.onmouseover = mouseoverproperty
			fielditem.onmouseout = mouseaway
			fielditem.onchange = setunsavedvalues
			if (arg_type == 4)
			{
				if (i == 'Distribution')
					fielditem.onclick = function() {togglechildwindow(1, 'distributionpropertyselect')}
				else if (i == 'SOBGroup')
					fielditem.onclick = function() {togglechildwindow(1, 'sobgrouppropertyselect')}
				fielditem.setAttribute('type', 'button')
				fielditem.className = 'inpbut2'
			}
			else
			{
				fielditem.setAttribute('type', 'text')
				fielditem.className = 'inptxt'
			}
			fielditem.setAttribute('id', 'param_' + i + '_' + k)
			fielditem.style.width = (152 - 6 * n - 4 * (n - 1))/n
			divitem.appendChild(fielditem)
		}
		listpane.appendChild(divitem)
	}
}
function unmakemoreproperties()	{unmakelist('morepropertieslist')}

// ---------------------------------------------Types

function maketypeselect()
{
	var purposetext = 'type'
	var listpane = childwindow.docGetById(purposetext + 'select')
	var type = docGetById('param_Type_0').value
	for (var i in mapobjecttable)
	{
		var listitem = childwindow.docMakeElem('div')
		var listtext = childwindow.docMakeText(i)
		listitem.setAttribute('id', purposetext + '_' + i)
		if (i == type)
		{
			listitem.className = 'selsel'
			currenttable[purposetext] = i
		}
		else
			listitem.className = 'selout'
		listitem.onmouseover = focustype
		listitem.onmouseout = unfocustype
		listitem.onclick = selecttype
		listitem.appendChild(listtext)
		listpane.appendChild(listitem)
	}
}

function unmaketypeselect()	{unmakeselect('type')}

// ---------------------------------------------Subtypes

function makesubtypeselect()
{
	var purposetext = 'subtype'
	var listpane = childwindow.docGetById(purposetext + 'select')
	var type = docGetById('param_Type_0').value
	var subtype = docGetById('param_Subtype_0').value
	for (var i in subtypetable[type].sort())
	{
		var thissubtype = subtypetable[type][i]
		var listitem = childwindow.docMakeElem('div')
		var listtext = childwindow.docMakeText(thissubtype)
		listitem.setAttribute('id', purposetext + '_' + thissubtype)
		if (thissubtype == subtype)
		{
			listitem.className = 'selsel'
			currenttable[purposetext] = thissubtype
		}
		else
			listitem.className = 'selout'
		listitem.onmouseover = focussubtype
		listitem.onmouseout = unfocussubtype
		listitem.onclick = selectsubtype
		listitem.appendChild(listtext)
		listpane.appendChild(listitem)
	}
}
function unmakesubtypeselect()	{unmakeselect('subtype')}

// ---------------------------------------------Distributions

function makedistributionpropertyselect()	{makecountselect('distributionproperty', Distributions, 1)}
function unmakedistributionpropertyselect()	{unmakeselect('distributionproperty')}

function makedistributionselect()	{makecountselect('distribution', Distributions, 3)}
function unmakedistributionselect()	{unmakeselect('distribution', 1)}

function makedistributionedit()		{childwindow.docGetById('distribution_result').value = currenttable.distribution}
function unmakedistributionedit()	{}

// ---------------------------------------------Sobgroups

function makesobgrouppropertyselect()	{makecountselect('sobgroupproperty', SOBGroups, 2)}
function unmakesobgrouppropertyselect()	{unmakeselect('sobgroupproperty')}

function makesobgroupselect()	{makecountselect('sobgroup', SOBGroups, 3)}
function unmakesobgroupselect()	{unmakeselect('sobgroup', 1)}

function makesobgroupedit()	{makeeditselect('sobgroup', 'squadron', SOBGroups, 0)}
function unmakesobgroupedit()	{unmakeselect('squadronedit');unmakeselect('squadronpool')}

// ---------------------------------------------Paths

function makepathselect()	{makecountselect('path', Paths, 3)}
function unmakepathselect()	{unmakeselect('path', 1)}

function makepathedit()		{makeeditselect('path', 'point', Paths, 1)}
function unmakepathedit()	{unmakeselect('pointedit');unmakeselect('pointpool')}

// ---------------------------------------------Level Settings

function makelevelsettingsselect()	{makecountselect('levelsetting', levelsettingshelptable, 4)}
function unmakelevelsettingsselect()	{unmakeselect('levelsetting')}

function makelevelsettingsproperties()
{
	var purposetext = 'levelsetting'
	var listpane = docGetById(purposetext + 'list')
	var currentpurp = currenttable[purposetext]
	var valu1 = tempobjecttable.levelsettings[currentpurp], desc1 = levelsettingshelptable[currentpurp], type1 = levelsettingstable[currentpurp]
	for (var i in desc1)
	{
		var valu2 = valu1[i], desc2 = desc1[i], type2 = type1[i]
		var labelitem = docMakeElem('label')
		var labeltext = docMakeText(i + ':')
		labelitem.setAttribute('id', 'label_' + i)
		labelitem.appendChild(labeltext)
		listpane.appendChild(labelitem)
		for (var k = 0, n = desc2.length; k < n; k++)
		{
			var arg_valu = valu2[k], arg_desc = desc2[k], arg_type = type2[k]
			var fielditem = docMakeElem('input')
			fielditem.setAttribute('desc', arg_desc)
			fielditem.onmouseover = mouseoverproperty
			fielditem.onmouseout = mouseaway
			fielditem.onchange = changelevelsetting
			fielditem.setAttribute('id', 'param_' + i + '_' + k)
			fielditem.setAttribute('setting', currenttable[purposetext])
			fielditem.setAttribute('param', i)
			fielditem.setAttribute('k', k)
			if (arg_type == 4)	//possible button
			{}
			else
				fielditem.className = 'inptxt'
			fielditem.style.width = (152 - 6 * n - 4 * (n - 1))/n
			fielditem.value = arg_valu
			listpane.appendChild(fielditem)
		}
	}
}
function unmakelevelsettingsproperties()	{unmakelist('levelsettinglist')}

//-------------------------------------------------------------Players

function makeplayersselect()	{makecountselect('player', Players, 5)}
function unmakeplayersselect()	{unmakeselect('player', 1)}

function makeplayeredit()
{
	var purposetext = 'player'
	var subpurpose = purposetext + 'edit'
	var currentpurp = currenttable[purposetext]
	childwindow.docGetById(purposetext + '_result').value = currentpurp
	var listpane = childwindow.docGetById(subpurpose + 'list')
	var valu1 = tempobjecttable[purposetext], desc1 = playerhelptable, type1 = playertable
	for (var i in desc1)
	{
		var valu2 = valu1[i], desc2 = desc1[i], type2 = type1[i]
		var labelitem = childwindow.docMakeElem('label')
		var labeltext = childwindow.docMakeText(i + ':')
		labelitem.setAttribute('id', 'label_' + i)
		labelitem.appendChild(labeltext)
		listpane.appendChild(labelitem)
		for (var k = 0, n = desc2.length; k < n; k++)
		{
			var arg_valu = valu2[k], arg_desc = desc2[k], arg_type = type2[k]
			var fielditem = childwindow.docMakeElem('input')
			fielditem.setAttribute('desc', arg_desc)
			fielditem.onmouseover = mouseoverproperty
			fielditem.onmouseout = mouseaway
			fielditem.onchange = changeplayer
			fielditem.setAttribute('id', 'param_' + i + '_' + k)
			fielditem.setAttribute('setting', currentpurp)
			fielditem.setAttribute('param', i)
			fielditem.setAttribute('k', k)
			if (arg_type == 4)	//possible button
			{}
			else
				fielditem.className = 'inptxt'
			fielditem.style.width = (158 - 6 * n - 4 * (n - 1))/n
			fielditem.value = arg_valu
			listpane.appendChild(fielditem)
		}
	}
}
function unmakeplayeredit()	{}

//-------------------------------------------------------------

function makecountselect(purposetext, purposetable, imode)
{
	//imode 1 = distributionproperty
	//imode 2 = sobgroupproperty
	//imode 3 = distribution, path, sobgroup
	//imode 4 = levelsetting
	//imode 5 = player
	if ((imode != 1) && (imode != 2) && checkunsavedvalues())
		return 0
	var bmatch = 0
	var tempGetById = docGetById
	var tempMakeElem = docMakeElem
	var tempMakeText = docMakeText
	counttable[purposetext] = 0
	if ((imode == 1) || (imode == 2))
	{
		tempGetById = childwindow.docGetById
		tempMakeElem = childwindow.docMakeElem
		tempMakeText = childwindow.docMakeText
		if (imode == 1)
			purposetable = recursivedistributionsearch(currenttable.distribution, Distributions)
	}
	var listpane = tempGetById(purposetext + 'select')
	for (var i in purposetable)
	{
		if (currenttable[purposetext] == i)
		{
			bmatch = 1
			break
		}
	}
	for (var i in purposetable)
	{
		var listitem = tempMakeElem('div')
		var listtext = tempMakeText(i)
		listitem.setAttribute('id', purposetext + '_' + i)
		listitem.appendChild(listtext)
		listpane.appendChild(listitem)
		if (bmatch && (currenttable[purposetext] == i))
			listitem.className = 'selsel'
		else if (!bmatch && (counttable[purposetext] == 0))
		{
			listitem.className = 'selsel'
			currenttable[purposetext] = i
		}
		else
			listitem.className = 'selout'
		listitem.onmouseover = eval('focus' + purposetext)
		listitem.onmouseout = eval('unfocus' + purposetext)
		listitem.onclick = eval('select' + purposetext)
		counttable[purposetext]++
	}
	if ((imode == 3) || (imode == 5))
	{
		if (counttable[purposetext] >= 1)
		{
			for (var i = 1; i < 3; i++)
				togglebutton(docGetById(purposetext + 'menu_' + i), 1)
			if (counttable[purposetext] >= 2)
			{
				for (var i = 3; i < 5; i++)
					togglebutton(docGetById(purposetext + 'menu_' + i), 1)
			}
		}
	}
}

function unmakeselect(purposetext, imode)
{
	unmakelist(purposetext + 'select')
	if (imode != 1)
		return 0
	for (var i = 1; i < 5; i++)
		togglebutton(docGetById(purposetext + 'menu_' + i), 0)
}

function unmakelist(purposetext)	{removeelements(docGetById(purposetext))}

function makeeditselect(purposetext, subpurposetext, purposetable, imode)
{
	// imode 0 = sobgroups
	// imode 1 = paths
	var thiswindow = childwindow
	var subpurpose1 = subpurposetext + 'edit'
	var subpurpose2 = subpurposetext + 'pool'
	var listpane = thiswindow.docGetById(subpurpose1 + 'select')
	var currentpurp = currenttable[purposetext]
	var thissobgroup = purposetable[currentpurp]
	var selectmode = 3
	if (imode == 0)
		selectmode = 6
	thiswindow.docGetById(purposetext + '_result').value = currentpurp
	counttable[subpurpose1] = 0
	for (var i = 0, n = thissobgroup.length; i < n; i++)
	{
		var object1 = thissobgroup[i]
		var label = object1[0]
		var amount = object1[1]
		var listitem = thiswindow.docMakeElem('div')
		var listtext = thiswindow.docMakeText()
		if (imode == 0)
		{
			var player = object1[2]
			var reactive = object1[3]
			listtext.nodeValue = label + ' [' + amount + ',' + player + ',' + reactive + ']'
			listitem.setAttribute('Player', player)
			listitem.setAttribute('Reactive', reactive)
		}
		else
			listtext.nodeValue = label + ' [' + amount + ']'
		listitem.setAttribute('id', subpurpose1 + '_' + label + '_' + i)
		listitem.setAttribute('Amount', amount)
		listitem.appendChild(listtext)
		listpane.appendChild(listitem)
		if (counttable[subpurpose1] == 0)
		{
			listitem.className = 'selsel'
			currenttable[subpurpose1] = [label + '_' + i, parseFloat(amount)]
			if (imode == 0)
				currenttable[subpurpose1].push(parseFloat(player), reactive)
		}
		else
			listitem.className = 'selout'
		listitem.onmouseover = eval('focus' + subpurpose1)
		listitem.onmouseout = eval('unfocus' + subpurpose1)
		listitem.onclick = eval('select' + subpurpose1)
		counttable[subpurpose1]++
	}
	listpane = thiswindow.docGetById(subpurpose2 + 'select')
	counttable[subpurpose2] = 0
	for (var i in Distributions)
	{
		var object1 = Distributions[i]
		for (var k = 0, n = object1.length; k < n; k++)
		{
			var object2 = object1[k]
			var type = object2.Type[0]
			if (((purposetext == 'sobgroup') && ((type == 'Squadron') || (type == 'RvSquadron'))) || ((purposetext == 'path') && (type == 'Point')))
			{
				var reactive = (type == "RvSquadron") ? 1 : 0
				var label = object2.Label[0]
				var tempbool = 1
				if (imode == 0)
				{
					if (reactive)
					{
						for (var j = 0, o = thissobgroup.length; j < o; j++)
						{
							if (label == thissobgroup[j][0])
							{
								tempbool = 0
								break
							}
						}
					}
					else
					{
						for (var j in SOBGroups)
						{
							var object3 = SOBGroups[j]
							for (var m = 0, p = object3.length; m < p; m++)
							{
								if (label == object3[m][0])
								{
									tempbool = 0
									break
								}
							}
							if (!tempbool)
								break
						}
					}
				}
				if (tempbool)
				{
					var amount = object2.Amount[0]
					var listitem = thiswindow.docMakeElem('div')
					var listtext = thiswindow.docMakeText()
					if (imode == 0)
					{
						var player = object2.Player[0]
						var squadtype = (type == 'RvSquadron') ? 1 : 0
						listtext.nodeValue = label + ' [' + amount + ',' + player + ',' + squadtype + ']'
						listitem.setAttribute('Player', player)
						listitem.setAttribute('Reactive', reactive)
					}
					else
						listtext.nodeValue = label + ' [' + amount + ']'
					listitem.setAttribute('id', subpurpose2 + '_' + label + '_' + counttable[subpurpose2])
					listitem.setAttribute('Amount', amount)
					listitem.appendChild(listtext)
					listpane.appendChild(listitem)
					if (counttable[subpurpose2] == 0)
					{
						listitem.className = 'selsel'
						currenttable[subpurpose2] = [label + '_' + counttable[subpurpose2], parseFloat(amount)]
						if (imode == 0)
							currenttable[subpurpose2].push(parseFloat(player), reactive)
					}
					else
						listitem.className = 'selout'
					listitem.onmouseover = eval('focus' + subpurpose2)
					listitem.onmouseout = eval('unfocus' + subpurpose2)
					listitem.onclick = eval('select' + subpurpose2)
					counttable[subpurpose2]++
				}
			}
		}
	}
	if (counttable[subpurpose2] >= 1)
		togglebutton(thiswindow.docGetById(subpurpose1 + 'menu_0'), 1)
	if (counttable[subpurpose1] >= 1)
		togglebutton(thiswindow.docGetById(subpurpose1 + 'menu_1'), 1)
	if (counttable[subpurpose1] >= 2)
	{
		for (var i = 2; i < 4; i++)
			togglebutton(thiswindow.docGetById(subpurpose1 + 'menu_' + i), 1)
	}
}
