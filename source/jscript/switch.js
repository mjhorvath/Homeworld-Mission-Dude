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

// ---------------------------------------------Focus & selection

function focusobject(TextCompare, imode, evt)
{
	if (mouseisdown || unsavedvalues)
		return 0
	var thisid = evt ? evt.target.id : event.srcElement.id
	var thispath = thisid.substr(thisid.indexOf('_') + 1)
	if (TextCompare == thispath)
		return 0
	var thisobjectid = 'object_' + thispath, thisselectid = 'select_' + thispath, currobjectid = 'object_' + TextCompare
	docGetById(thisselectid).className = imode ? 'selovr' : 'selout'
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var thisdoc = checksvgdocument(viewangle)
		var highlightbox = thisdoc.getElementById('highlightbox')
		if (imode)
		{
			var thisobject = thisdoc.getElementById(thisobjectid)
			var thistransform = thisobject.getAttribute('transform')
			var temptext = thispath + ' ' + thisobject.getAttribute('Info')
			highlightbox.setAttribute('transform', thistransform)
			highlightbox.childNodes.item(3).firstChild.nodeValue = temptext
		}
		highlightbox.style.setProperty('display', imode ? 'block' : 'none')
	}
}

function selectobject(label, evt)
{
	if (checkunsavedvalues())
		return 0
	if (label)
		var thispath = label
	else
	{
		var thisid = evt ? evt.target.id : event.srcElement.id
		var thispath = thisid.substr(thisid.indexOf('_') + 1)
	}
	var object1 = Distributions[currenttable.distribution]
	for (var i = 0, n = object1.length; i < n; i++)
	{
		if (object1[i].Label[0] == thispath)
		{
			currenttable.object = [thispath, i]
			break
		}
	}
	var currentlabel = currenttable.object[0], currentindex = currenttable.object[1]
	var previouslabel = previoustable.object[0], previousindex = previoustable.object[1]
	var thisobjectid = 'object_' + currentlabel, thisselectid = 'select_' + currentlabel
	var prevobjectid = 'object_' + previouslabel, prevselectid = 'select_' + previouslabel
	var thisselect = docGetById(thisselectid)
	var prevselect = docGetById(prevselectid)

	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		if ((currentindex != previousindex) && (currentindex > -1))
		{
			var thisdoc = checksvgdocument(viewangle)
			var selectbox = thisdoc.getElementById('selectbox')
			var highlightbox = thisdoc.getElementById('highlightbox')
			var thisobject = thisdoc.getElementById(thisobjectid)
			var thistransform = thisobject.getAttribute('transform')
			var thisobjecttext = thisdoc.getElementById(thisobjectid + '_text')
			var prevobjecttext = thisdoc.getElementById(prevobjectid + '_text')
			var temptext = thispath + ' ' + thisobject.getAttribute('Info')
			highlightbox.style.setProperty('display', 'none')
			selectbox.style.setProperty('display', 'block')
			selectbox.setAttribute('transform', thistransform)
			var textitem = selectbox.childNodes.item(3)	// switch to 1 if the order of the elements is changed
			var frameitem = thisdoc.getElementById('selectframe')
			textitem.firstChild.nodeValue = temptext
			var bbox = textitem.getBBox()
			frameitem.setAttribute('width', bbox.width + 14)
		}
	}
	if (currentindex != previousindex)
	{
		if (currentlabel != '')
		{
			thisselect.className = 'selsel'
			thisselect.setAttribute('selected', 'selected')
			if (prevselect)
			{
				prevselect.className = 'selout'
				prevselect.removeAttribute('selected')
			}
			editbasicproperties()
			disablebasicproperties()
			unmakemoreproperties()
			makemoreproperties()
			editmoreproperties()
		}
		else
		{
			clearmoreproperties()
			clearbasicproperties()
		}
	}
	previoustable.object = [currentlabel, currentindex]
}

function focusdiv(TextCompare, imode)
{
	var thiswindow = (childwindowopen && childwindow.event) ? childwindow : window
	var thisobject = thiswindow.event.srcElement
	var thisid = thisobject.id
	var thispath = thisid.substr(thisid.indexOf('_') + 1)
	if (TextCompare == thispath)
		return 0
	thisobject.className = imode ? 'selovr' : 'selout'
}

function selectdiv(TextCompare, imode, ParentText)
{
	var thiswindow = (childwindowopen && childwindow.event) ? childwindow : window
	var thisobject = thiswindow.event.srcElement
	var thisid = thisobject.id
	var thispath = thisid.substr(thisid.indexOf('_') + 1), thisprfx = thisid.split('_')[0]
	var currentpurp = currenttable[TextCompare]
	switch (imode)
	{
		case 3:		// pathedit
		case 6:		// squadronedit
			var thisamount = thisobject.getAttribute('Amount')
			if (currentpurp[0] != thispath)
			{
				previoustable[TextCompare] = returncopy(currentpurp)
				currenttable[TextCompare] = [thispath, thisamount]
				currentpurp = currenttable[TextCompare]
				if (imode == 6)
				{
					currentpurp[currentpurp.length] = parseFloat(thisobject.getAttribute('Player'))
					currentpurp[currentpurp.length] = parseFloat(thisobject.getAttribute('Reactive'))
				}
				var prevobjectid = thisprfx + '_' + previoustable[TextCompare][0]
				var prevobject = thiswindow.docGetById(prevobjectid)
				if (prevobject)
					prevobject.className = 'selout'
				thisobject.className = 'selsel'
			}
//			thiswindow.docGetById(ParentText + '_result').value = currentpurp[0]
		break
		default:
			if (currentpurp != thispath)
			{
				previoustable[TextCompare] = currentpurp
				currenttable[TextCompare] = thispath
				currentpurp = currenttable[TextCompare]
				var prevobjectid = thisprfx + '_' + previoustable[TextCompare]
				var prevobject = thiswindow.docGetById(prevobjectid)
				if (prevobject)
					prevobject.className = 'selout'
				thisobject.className = 'selsel'
			}
		break
	}
	switch (imode)
	{
		case 2:		// levelsettingsselect
			unmakelevelsettingsproperties()
			makelevelsettingsproperties()
		break
		case 4:		// distributionselect
			previoustable.object = ['', -1]
			currenttable.object = checkdistribution() ? [Distributions[currenttable.distribution][0].Label[0], 0] : ['', -1]
			disablebasicproperties()
			unmakemoreproperties()
			resetmap(0)
		break
	}
}

function focusappobject()	{focusobject(currenttable['object'][0], 1)}
function unfocusappobject()	{focusobject(currenttable['object'][0], 0)}
function selectappobject()	{selectobject(null)}
function focusmapobject(evt)	{focusobject(currenttable['object'][0], 1, evt)}
function unfocusmapobject(evt)	{focusobject(currenttable['object'][0], 0, evt)}
function selectmapobject(evt)	{selectobject(null, evt)}
function changelevelsetting()	{setunsavedvalues();rememberlevelsetting()}
function focustype()		{focusdiv(currenttable['type'], 1)}
function unfocustype()		{focusdiv(currenttable['type'], 0)}
function selecttype()		{selectdiv('type', 0)}
function focussubtype()		{focusdiv(currenttable['subtype'], 1)}
function unfocussubtype()	{focusdiv(currenttable['subtype'], 0)}
function selectsubtype()	{selectdiv('subtype', 0)}
function focusdistribution()	{focusdiv(currenttable.distribution, 1)}
function unfocusdistribution()	{focusdiv(currenttable.distribution, 0)}
function selectdistribution()	{selectdiv('distribution', 4)}
function focuslevelsetting()	{focusdiv(currenttable['levelsetting'], 1)}
function unfocuslevelsetting()	{focusdiv(currenttable['levelsetting'], 0)}
function selectlevelsetting()	{selectdiv('levelsetting', 2)}
function focusplayer()		{focusdiv(currenttable['player'], 1)}
function unfocusplayer()	{focusdiv(currenttable['player'], 0)}
function selectplayer()		{selectdiv('player', 2)}
function changeplayer()		{rememberplayer()}
function focussobgroup()	{focusdiv(currenttable['sobgroup'], 1)}
function unfocussobgroup()	{focusdiv(currenttable['sobgroup'], 0)}
function selectsobgroup()	{selectdiv('sobgroup', 0)}
function focuspath()		{focusdiv(currenttable['path'], 1)}
function unfocuspath()		{focusdiv(currenttable['path'], 0)}
function selectpath()		{selectdiv('path', 0)}
function focusdistributionproperty()	{focusdiv(currenttable['distributionproperty'], 1)}
function unfocusdistributionproperty()	{focusdiv(currenttable['distributionproperty'], 0)}
function selectdistributionproperty()	{selectdiv('distributionproperty', 0)}
function focussobgroupproperty()	{focusdiv(currenttable['sobgroupproperty'], 1)}
function unfocussobgroupproperty()	{focusdiv(currenttable['sobgroupproperty'], 0)}
function selectsobgroupproperty()	{selectdiv('sobgroupproperty', 0)}
function focussquadronedit()	{focusdiv(currenttable['squadronedit'][0], 1)}
function unfocussquadronedit()	{focusdiv(currenttable['squadronedit'][0], 0)}
function selectsquadronedit()	{selectdiv('squadronedit', 6, 'sobgroup')}
function focussquadronpool()	{focusdiv(currenttable['squadronpool'][0], 1)}
function unfocussquadronpool()	{focusdiv(currenttable['squadronpool'][0], 0)}
function selectsquadronpool()	{selectdiv('squadronpool', 6, 'sobgroup')}
function focuspointedit()	{focusdiv(currenttable['pointedit'][0], 1)}
function unfocuspointedit()	{focusdiv(currenttable['pointedit'][0], 0)}
function selectpointedit()	{selectdiv('pointedit', 3, 'path')}
function focuspointpool()	{focusdiv(currenttable['pointpool'][0], 1)}
function unfocuspointpool()	{focusdiv(currenttable['pointpool'][0], 0)}
function selectpointpool()	{selectdiv('pointpool', 3, 'path')}


// ---------------------------------------------Toggles

var thispanel = [0,0,0,0]

function togglepane(num, pane)
{
	if ((num != 2) && checkunsavedvalues())
		return 0
	var oldid = num + '_' + thispanel[num], newid = num + '_' + pane
	thispanel[num] = pane
	docGetById(oldid + '_pnl').style.display = 'none'
	docGetById(newid + '_pnl').style.display = 'block'
	toggletabbutton(docGetById(oldid + '_but'), 1)
	toggletabbutton(docGetById(newid + '_but'), 0)
}

function togglechildwindow(imode, purposetext)
{
	if (imode)
	{
		if (childwindowopen)
			return 0
		childwindowid = purposetext
		var windowoptions = 'dialogHide:yes;scroll:no;'
		var windowsource = './source/xml/childwindow.html'
		switch (childwindowid)
		{
			case 'help':
				windowoptions += 'dialogWidth:820px;dialogHeight:620px;'
				windowsource = './source/xml/helpwindow.html'
			break
			case 'distributionedit':
				windowoptions += 'dialogWidth:420px;dialogHeight:170px;'
			break
			case 'pathedit':
			case 'sobgroupedit':
				windowoptions += 'dialogWidth:420px;dialogHeight:400px;'
			break
			case 'viewingoptions':
				windowoptions += 'dialogWidth:420px;dialogHeight:450px;'
			break
			default:
				windowoptions += 'dialogWidth:420px;dialogHeight:270px;'
			break
		}
		childwindow = window.showModelessDialog(windowsource, [window, childwindowid], windowoptions)
	}
	else
	{
		childwindow.close()
		childwindowid = ''
	}
	resetstatustext()
}

function toggleprogresswindow(imode)
{
	if (imode)
	{
		if (progresswindowopen)
			return 0
		var windowoptions = 'dialogHide:yes;scroll:no;'
		windowoptions += 'dialogWidth:420px;dialogHeight:100px;'
		progresswindow = window.showModelessDialog('./source/xml/progresswindow.html', [window, 'progress'], windowoptions)
	}
	else
		progresswindow.close()
}

function togglechildpane(imode, id)
{
	childwindow.docGetById(id + '_pnl').style.display = imode ? 'block' : 'none'
}

function toggleviewoptions(imode)
{
	if (checkunsavedvalues())
		return 0
	else
		togglechildwindow((!imode && childwindowopen) ? 0 : 1, 'viewingoptions')
}

function togglehelpwindow(imode)
{
	togglechildwindow((!imode && childwindowopen) ? 0 : 1, 'help')
}

function togglehelppane(ipage)
{
	for (var i = 0; i < 6; i++)
	{
		childwindow.docGetById('help_pg' + i).style.display = (i == ipage) ? 'block' : 'none'
		togglebutton(childwindow.docGetById('help_bt' + i), (i == ipage) ? 0 : 1)
	}
}

function togglestylesheet(sstyle, node, pass)
{
	node = node ? node : window.document
	if (!node.styleSheets)
		return 0
	if (AppSettings.stylesheet != sstyle)
		AppSettings.stylesheet = sstyle
	var thesestyles = node.styleSheets
	for (var i = 0, n = thesestyles.length; i < n; i++)
	{
		var thisstyle = thesestyles[i]
		var thisbutton = node.getElementById('style_' + i)
		if (thisstyle.title == sstyle)
		{
			thisstyle.disabled = false
			if (thisbutton)
				togglebutton(thisbutton, 0)
		}
		else
		{
			thisstyle.disabled = true
			if (thisbutton)
				togglebutton(thisbutton, 1, 1)
		}
	}
	var theseelements = node.getElementsByTagName('input')
	for (var i = 0, n = theseelements.length; i < n; i++)
	{
		var thiselement = theseelements[i]
		var thisclass = thiselement.className
		if ((thisclass == 'inpbut_dis') || (thisclass == 'legsel'))
		{
			switch (sstyle)
			{
				case 'Default':
					thiselement.setAttribute('disabled', 'disabled')
				break
				case 'Blue':
					thiselement.removeAttribute('disabled')
				break
			}
		}
	}
	if (!pass && childwindowopen)
		togglestylesheet(sstyle, childwindow.document, 2)
}

function togglelegend()
{
	legendopen = legendopen ? 0 : 1
	var thisstyle = legendopen ? 'block' : 'none'
	for (var viewangle = 2; viewangle >= 0; viewangle--)
		checksvgdocument(viewangle).getElementById('legend').style.setProperty('display', thisstyle)
}

function updatebgimage()
{
	with (AppSettings)
	{
		for (var viewangle = 2; viewangle >= 0; viewangle--)
		{
			var imagename = 'image' + viewangle
			var thisimage = checksvgdocument(viewangle).getElementById(imagename)
			thisimage.setAttribute('x', imageleft/-mapunit)
			thisimage.setAttribute('y', imagetop/-mapunit)
			thisimage.setAttribute('width', imagewidth/mapunit)
			thisimage.setAttribute('height', imageheight/mapunit)
		}
	}
}

function updatelegend(viewangle)
{
	with (AppSettings)
	{
		var svgDocument = checksvgdocument(viewangle)
		var adjustedscale = mapzoom/mapfontscale/mapscale[viewangle]
		var currenttrans = maptrans[viewangle]
		var currentscale = 2/mapscale[viewangle]
		var tempvalue = currentscale * 100/winzoom
		var coox = leftadjust * (1 + currenttrans.x/mapwidth * tempvalue)
		var cooy = leftadjust * (1 + currenttrans.y/mapheight * tempvalue) * aspectratio
		var thistransform = 'matrix(' + adjustedscale + ' 0 0 ' + adjustedscale + ' ' + coox + ' ' + cooy + ')'
		svgDocument.getElementById('legend').setAttribute('transform', thistransform)
		tempvalue = currentscale * leftadjust
		coox -= tempvalue
		cooy -= tempvalue * aspectratio
		thistransform = 'matrix(' + adjustedscale + ' 0 0 ' + adjustedscale + ' ' + coox + ' ' + cooy + ')'
		svgDocument.getElementById('statusbox').setAttribute('transform', thistransform)
	}
}

function togglegrid(imode)
{
	AppSettings.viewgrid = imode
	if (childwindowopen)
	{
		togglebutton(childwindow.docGetById('gridon'), imode ? 0 : 1)
		togglebutton(childwindow.docGetById('gridoff'), imode ? 1 : 0)
	}
	var thisstyle = imode ? 'block' : 'none'
	for (var viewangle = 2; viewangle >= 0; viewangle--)
		checksvgdocument(viewangle).getElementById('grid').style.setProperty('display', thisstyle)
}

function togglesnaptogrid(imode)
{
	AppSettings.snaptogrid = imode
	snapamount = AppSettings.snaptogrid ? AppSettings.gridsize : 1
	if (childwindowopen)
	{
		togglebutton(childwindow.docGetById('snapon'), imode ? 0 : 1)
		togglebutton(childwindow.docGetById('snapoff'), imode ? 1 : 0)
	}
}

function togglescaleonzoom(imode, noreset)
{
	AppSettings.scaleonzoom = imode
	if (childwindowopen)
	{
		togglebutton(childwindow.docGetById('scaleon'), imode ? 0 : 1)
		togglebutton(childwindow.docGetById('scaleoff'), imode ? 1 : 0)
		if (!noreset)
			resetmap(1)
	}
}

function toggledropshadow(imode)
{
	AppSettings.dropshadow = imode
	if (childwindowopen)
	{
		togglebutton(childwindow.docGetById('dropon'), imode ? 0 : 1)
		togglebutton(childwindow.docGetById('dropoff'), imode ? 1 : 0)
	}
	var filter1 = imode ? 'url(#dropShadow)' : 'none'
	var filter2 = imode ? 'url(#specBubble)' : 'none'
	var filter3 = imode ? 'url(#switchColor)' : 'none'
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var thisdoc = checksvgdocument(viewangle)
		thisdoc.getElementById('selectframe').style.setProperty('filter', filter1)
		thisdoc.getElementById('highlightframe').style.setProperty('filter', filter1)
//		thisdoc.getElementById('legframe').style.setProperty('filter', filter2)
	}
}

function togglebackground(imode)
{
	AppSettings.background = imode
	if (childwindowopen)
	{
		togglebutton(childwindow.docGetById('photoon'), imode ? 0 : 1)
		togglebutton(childwindow.docGetById('photooff'), imode ? 1 : 0)
	}
	var thisstyle = imode ? 'block' : 'none'
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		checksvgdocument(viewangle).getElementById('image' + viewangle).style.setProperty('display', thisstyle)
	}
}

function toggleruler(imode)
{
	AppSettings.viewruler = imode
	if (childwindowopen)
	{
		togglebutton(childwindow.docGetById('ruleon'), imode ? 0 : 1)
		togglebutton(childwindow.docGetById('ruleoff'), imode ? 1 : 0)
	}
	var thisstyle = imode ? 'block' : 'none'
	for (var viewangle = 2; viewangle >= 0; viewangle--)
		checksvgdocument(viewangle).getElementById('rule').style.setProperty('display', thisstyle)
}

function toggleaxes(imode)
{
	AppSettings.viewaxes = imode
	if (childwindowopen)
	{
		togglebutton(childwindow.docGetById('axeson'), imode ? 0 : 1)
		togglebutton(childwindow.docGetById('axesoff'), imode ? 1 : 0)
	}
	var thisstyle = imode ? 'block' : 'none'
	for (var viewangle = 2; viewangle >= 0; viewangle--)
		checksvgdocument(viewangle).getElementById('axes').style.setProperty('display', thisstyle)
}

function toggledraganddrop(imode)
{
	AppSettings.draganddrop = imode
	if (!childwindowopen)
		return 0
	togglebutton(childwindow.docGetById('dragon'), imode ? 0 : 1)
	togglebutton(childwindow.docGetById('dragoff'), imode ? 1 : 0)
}

function togglespecial(imode)
{
	if (childwindowopen || checkunsavedvalues())
		return 0
	for (var i = 0; i < 4; i++)
	{
		if (i == imode)
			togglebutton(docGetById('spc_' + i), 0)
		else
			togglebutton(docGetById('spc_' + i), 1)
	}
	switch (imode)
	{

	}
	specialmode = imode
}

function togglebutton(thisbutton, imode, flag)
{
	if (imode && ((AppSettings.stylesheet == 'Default') || flag))
		thisbutton.removeAttribute('disabled')
	else if (AppSettings.stylesheet == 'Default')
		thisbutton.setAttribute('disabled', 'disabled')
	thisbutton.className = imode ? 'inpbut' : 'inpbut_dis'
}

function toggletabbutton(thisbutton, imode, flag)
{
	if (imode && ((AppSettings.stylesheet == 'Default') || flag))
		thisbutton.removeAttribute('disabled')
	else if (AppSettings.stylesheet == 'Default')
		thisbutton.setAttribute('disabled', 'disabled')
	thisbutton.className = imode ? 'legdes' : 'legsel'
}

function togglemiscinput(thisbutton, imode)
{
	if (thisbutton.getAttribute('type') == 'text')
		thisbutton.className = imode ? 'inptxt' : 'inptxt_dis'
	else if (thisbutton.getAttribute('type') == 'button')
		thisbutton.className = imode ? 'inpbut2' : 'inpbut2_dis'
	if (imode)
		thisbutton.removeAttribute('disabled')
	else
		thisbutton.setAttribute('disabled', 'disabled')
}
