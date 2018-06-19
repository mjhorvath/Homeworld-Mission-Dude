// Adapted from an example found at http://www.kevlindev.com/tutorials/basics/transformations/tracker/index.htm
function findUserCoord(evt)
{
	if (justloaded)
		justloaded = 0		// hack to keep mouse events from firing after loading a saved map
	var thisdoc = evt.target.ownerDocument
	var viewangle = parseFloat(thisdoc.documentElement.getAttribute('viewangle'))
	var currenttrans = maptrans[viewangle]
	var adjustedcoords = mapadjustedcoordinates[viewangle]
	var adjustedscale = mapadjustedscale[viewangle]
	var coox = Math.round(((evt.clientX - currenttrans.x) * adjustedcoords + 0.5) * mouseconstant/snapamount) * snapamount
	var cooy = Math.round(((evt.clientY - currenttrans.y) * adjustedcoords + 0.5 * aspectratio) * mouseconstant/snapamount) * snapamount
	switch (viewangle)
	{
		case 0:
			mapcoords[0] = coox, mapcoords[2] = cooy
			thisdoc.getElementById('status_x').firstChild.nodeValue = coox
			thisdoc.getElementById('status_z').firstChild.nodeValue = cooy
		break
		case 1:
			mapcoords[0] = coox, mapcoords[1] = cooy
			thisdoc.getElementById('status_x').firstChild.nodeValue = coox
			thisdoc.getElementById('status_y').firstChild.nodeValue = cooy
		break
		case 2:
			mapcoords[1] = cooy, mapcoords[2] = coox
			thisdoc.getElementById('status_y').firstChild.nodeValue = coox
			thisdoc.getElementById('status_z').firstChild.nodeValue = cooy
		break
	}
	if (!mouseisdown)
		return 0
	var currentlabel = mapobjectlabels[0], grabbedlabel = mapobjectlabels[1]
	var thisobject = thisdoc.getElementById('object_' + grabbedlabel)
	var thistransform = 'matrix(' + adjustedscale + ' 0 0 ' + adjustedscale + ' ' + coox/unitadjust + ' ' + cooy/unitadjust + ')'
	thisobject.setAttribute('transform', thistransform)
	var areaobject = thisdoc.getElementById('area_' + grabbedlabel)
	if (areaobject)
		areaobject.setAttribute('transform', thistransform)
	if (grabbedlabel == currentlabel)
		thisdoc.getElementById('selectbox').setAttribute('transform', thistransform)
	else
		thisdoc.getElementById('highlightbox').setAttribute('transform', thistransform)
}
//mouseupobject(evt, 1)
function mouseclickobject(evt)	{evt.shiftKey ? null : selectmapobject(evt)}
function mouseoverobject(evt)	{focusmapobject(evt)}
function mouseoutobject(evt)	{unfocusmapobject(evt)}

function mousedownobject(evt)
{
	if (checkunsavedvalues() || !AppSettings.draganddrop || evt.button == 2 || justloaded)
		return 0
	var target = evt.target
	var thisid = target.id, thisdoc = target.ownerDocument
	var thispath = thisid.substr(thisid.indexOf('_') + 1), currpath = currenttable.object[0]
	var viewangle = parseFloat(thisdoc.documentElement.getAttribute('viewangle'))
	mouseisdown = 1, mapobjectlabels[1] = thispath, mapobjectlabels[0] = currpath
	for (var newangle = 2; newangle >= 0; newangle--)
	{
		var newdoc = checksvgdocument(newangle)
		var grabbedobject = newdoc.getElementById(thisid)
		var parentobject = grabbedobject.parentNode
		parentobject.removeChild(grabbedobject)
		parentobject.appendChild(grabbedobject)
	}
	target.style.setProperty('pointer-events', 'none')
	if (thispath != currpath)
		thisdoc.getElementById('object_' + currpath).style.setProperty('pointer-events', 'none')
}

function mouseupobject(evt, imode)
{
	if (!mouseisdown || !AppSettings.draganddrop || evt.button == 2 || justloaded)
		return 0
	mouseisdown = 0
	var thisdoc = evt.target.ownerDocument
	thisdoc.getElementById('object_' + mapobjectlabels[1]).style.setProperty('pointer-events', 'all')
	if (mapobjectlabels[1] != mapobjectlabels[0])
		thisdoc.getElementById('object_' + mapobjectlabels[0]).style.setProperty('pointer-events', 'all')
	if (imode)
		return 0
	var viewangle = parseFloat(thisdoc.documentElement.getAttribute('viewangle'))
	var thisdist = Distributions[currenttable.distribution]
	for (var i = 0, n = thisdist.length; i < n; i++)
	{
		var object1 = thisdist[i]
		if (mapobjectlabels[1] == object1.Label[0])
		{
			switch (viewangle)
			{
				case 0:
					object1.Translation[0] = mapcoords[0]
					object1.Translation[2] = mapcoords[2]
				break
				case 1:
					object1.Translation[0] = mapcoords[0]
					object1.Translation[1] = mapcoords[1]
				break
				case 2:
					object1.Translation[1] = mapcoords[1]
					object1.Translation[2] = mapcoords[2]
				break
			}
			break
		}
	}
	var coox = mapcoords[0]/-mapunit, cooy = mapcoords[1]/-mapunit, cooz = mapcoords[2]/-mapunit
	for (var newangle = 2; newangle >= 0; newangle--)
	{
		if (viewangle != newangle)
		{
			var thisdoc2 = checksvgdocument(newangle)
			var grabbedobject = thisdoc2.getElementById('object_' + mapobjectlabels[1])
			var m = grabbedobject.getCTM()
			var adjustedscale = mapadjustedscale[newangle - 1]
			switch (newangle)
			{
				case 0:
					viewangle == 1 ? m.e = coox : m.f = cooz
				break
				case 1:
					viewangle == 0 ? m.e = coox : m.f = cooy
				break
				case 2:
					viewangle == 0 ? m.e = cooz : m.f = cooy
				break
			}
			var thistransform = 'matrix(' + adjustedscale + ' 0 0 ' + adjustedscale + ' ' + m.e + ' ' + m.f + ')'
			grabbedobject.setAttribute('transform', thistransform)
			var areaobject = thisdoc2.getElementById('area_' + mapobjectlabels[1])
			if (areaobject)
				areaobject.setAttribute('transform', thistransform)
			if (mapobjectlabels[1] == mapobjectlabels[0])
				thisdoc2.getElementById('selectbox').setAttribute('transform', thistransform)
			else
				thisdoc2.getElementById('highlightbox').setAttribute('transform', thistransform)
		}
	}
	if (mapobjectlabels[1] == mapobjectlabels[0])
	{
		editbasicproperties()
	}
//	setunsavedvalues()
	setunsaveddocument()
}

function svgdoconclick(evt)
{
	if (evt.shiftKey)
	{
		switch (specialmode)
		{
			case 1:
				addobject(1)
			break
			case 2:
//				targetobject(evt)
			break
			case 3:
				jitterobject(evt)
			break
		}
	}
}

function svgdoconscroll(evt)
{
	var thisroot = evt.target.ownerDocument.rootElement
	var viewangle = thisroot.getAttribute('viewangle')
	maptrans[viewangle] = thisroot.currentTranslate
	updatelegend(viewangle)
	mouseupobject(evt, 1)
}

function svgdoconzoom(evt)
{
	var thisroot = evt.target.ownerDocument.documentElement
	var viewangle = thisroot.getAttribute('viewangle')
	var currentscale = thisroot.currentScale
	if (mapscale[viewangle] != currentscale)
	{
		with (AppSettings)
		{
			mapscale[viewangle] = currentscale
			maptrans[viewangle] = thisroot.currentTranslate
			mapadjustedscale[viewangle] = scaleonzoom ? mapzoom/mapfontscale/currentscale : 1
			mapadjustedcoordinates[viewangle] = -mapunit/winzoom/currentscale/mapwidth
			updatelegend(viewangle)
			mouseupobject(evt, 1)
			if (scaleonzoom)
				resetmap(1)
		}
	}
}

function mouseoverproperty()
{
	if (childwindowopen && childwindow.event)
		var thiselem = childwindow.event.srcElement
	else if (window.event)
		var thiselem = window.event.srcElement
	if (thiselem)
		var thisdesc = thiselem.getAttribute('desc')
	if (thisdesc)
		setstatustext(thisdesc)
}

function mouseaway()	{resetstatustext()}

function clickagain()
{
	if (childwindowopen && childwindow.event)
		var thiselem = childwindow.event.srcElement
	else if (window.event)
		var thiselem = window.event.srcElement
	if (thiselem && thiselem.click)
		thiselem.click()
}

function calculatezoom()
{
	var n = hiddenelement.offsetLeft/hiddenelement.style.pixelLeft * 100
	var r = n%5
	if (r)
		n = n - r + Math.round(r/5) * 5
	return n
}

function updatewinzoom()
{
	var nZoom = calculatezoom()
	if (winzoom == nZoom)
		return 0
	winzoom = nZoom
	var tempvalue = -mapunit/winzoom/AppSettings.mapwidth
	for (var viewangle = 2; viewangle >= 0; viewangle--)
		mapadjustedcoordinates[viewangle] = tempvalue/mapscale[viewangle]
}

function windowresize()
{
	updatewinzoom()
	with (AppSettings)
	{
		var zoomadjust = 100/winzoom, oldmapwidth = mapwidth, oldmapheight = mapheight
		var doceelem = document.documentElement
		var cwidth = doceelem.clientWidth * zoomadjust, cheight = doceelem.clientHeight * zoomadjust
		switch (stylesheet)
		{
			case 'Default':
				mapwidth = cwidth - 304
				if (cheight > 676)
					mapheight = cheight - 148
				else if (cheight > (607 + 10))
					mapheight = 528
				else
					mapheight = cheight - 89
			break
			case 'Blue':
				mapwidth = cwidth - 304
				if (cheight > 686)
					mapheight = cheight - 158
				else if (cheight > (610 + 10))
					mapheight = 528
				else
					mapheight = cheight - 92
			break
		}
		if ((oldmapwidth != mapwidth) || (oldmapheight != mapheight))
			resizemap()
	}
}

function jitterobject(evt)
{
	var currentlabel = mapobjectlabels[0], grabbedlabel = mapobjectlabels[1]
	if (evt.target.id != 'object_' + grabbedlabel)
		return 0
	var thisdist = Distributions[currenttable.distribution], thispos = []
	for (var i = 0, n = thisdist.length; i < n; i++)
	{
		var object1 = thisdist[i]
		if (grabbedlabel == object1.Label[0])
		{
			thispos = object1.Translation
			with (AppSettings)
			{
				thispos[0] += Math.round(Math.random() * jitterx * 2 - jitterx)
				thispos[1] += Math.round(Math.random() * jittery * 2 - jittery)
				thispos[2] += Math.round(Math.random() * jitterz * 2 - jitterz)
			}
			break
		}
	}
	for (var viewangle = 2; viewangle >= 0; viewangle--)
	{
		var thisdoc = checksvgdocument(viewangle)
		var adjustedscale = mapadjustedscale[viewangle]
		switch (viewangle)
		{
			case 0:
				var coox = thispos[0], cooy = thispos[2]
			break
			case 1:
				var coox = thispos[0], cooy = thispos[1]
			break
			case 2:
				var cooy = thispos[1], coox = thispos[2]
			break
		}
		var thistransform = 'matrix(' + adjustedscale + ' 0 0 ' + adjustedscale + ' ' + coox/unitadjust + ' ' + cooy/unitadjust + ')'
		thisdoc.getElementById('object_' + grabbedlabel).setAttribute('transform', thistransform)
		var areaobject = thisdoc.getElementById('area_' + grabbedlabel)
		if (areaobject)
			areaobject.setAttribute('transform', thistransform)
		if (grabbedlabel == currentlabel)
			thisdoc.getElementById('selectbox').setAttribute('transform', thistransform)
		else
			thisdoc.getElementById('highlightbox').setAttribute('transform', thistransform)
	}
}
