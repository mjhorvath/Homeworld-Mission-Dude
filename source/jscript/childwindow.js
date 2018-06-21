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

var pw = dialogArguments[0]
var windowid = dialogArguments[1]
var docGetById = document.getElementById
var docMakeElem = document.createElement
var docMakeText = document.createTextNode
document.title = pw.AppTitle + ' ' + pw.LatestAppVersion
function initialize_child()
{
	if (windowid == 'progress')
	{
		pw.loadstylesheet(2)
		pw.progressstyle = docGetById('progress_embed').style
		pw.progresswindowopen = 1
	}
	else
	{
		pw.loadstylesheet(1)
		pw.togglechildpane(1, windowid)
		document.ondblclick = pw.clickagain
		document.onmouseover = pw.mouseoverproperty
		document.onmouseout = pw.mouseaway
		pw.childwindowopen = 1
	}
	if (windowid == 'viewingoptions')
		pw.applyappsettings(1)
	try
	{
		eval('pw.make' + windowid + '()')
	}
	catch (e)
	{
	}
}
function unload_child()
{
	if (windowid == 'progress')
	{
		pw.progressstyle = null
		pw.progresswindowopen = 0
	}
	else
	{
		document.ondblclick = null
		document.onmouseover = null
		document.onmouseout = null
		pw.childwindowopen = 0
	}
}
