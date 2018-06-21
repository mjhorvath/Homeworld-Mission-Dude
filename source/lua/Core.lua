-- This is free and unencumbered software released into the public domain.
-- 
-- Anyone is free to copy, modify, publish, use, compile, sell, or
-- distribute this software, either in source code form or as a compiled
-- binary, for any purpose, commercial or non-commercial, and by any
-- means.
-- 
-- In jurisdictions that recognize copyright laws, the author or authors
-- of this software dedicate any and all copyright interest in the
-- software to the public domain. We make this dedication for the benefit
-- of the public at large and to the detriment of our heirs and
-- successors. We intend this dedication to be an overt act of
-- relinquishment in perpetuity of all present and future rights to this
-- software under copyright law.
-- 
-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
-- EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
-- MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
-- IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
-- OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
-- ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
-- OTHER DEALINGS IN THE SOFTWARE.
-- 
-- For more information, please refer to <http://unlicense.org/>

iStartPoints, iPoints, iSpheres, iCameras, iSquadrons, iAsteroids, iSalvage, iPebbles, iClouds, iDustClouds, iNebulas, iDirLights, iRvResources, iRvSquadrons = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

function appendShape(tPos, i, tPar, j, tCoo, tRot)
	-- tPar[1] is the amount
	-- tPar[2] is the unique label (new)
	-- tPar[3] is the object type
	tCoo = vaddV(vrotate(tCoo, tRot), tPos)
	if (tPar[2+1] == "Point") then
		--addPoint(<sPointName>, <tPosition>, <tRotation>)
		addPoint(tPar[3+1], vaddV(tCoo, tPar[4+1]), tPar[5+1])
		iPoints = iPoints + 1
	elseif (tPar[2+1] == "StartPoint") then
		--addPoint(<sPointName>, <tPosition>, <tRotation>)
		addPoint("StartPos" .. iStartPoints, vaddV(tCoo, tPar[4+1]), tPar[5+1])
		iStartPoints = iStartPoints + 1					
	elseif (tPar[2+1] == "Sphere") then
		--addSphere(<sSphereName>, <tPosition>, <fRadius>)
		addSphere(tPar[3+1], vaddV(tCoo, tPar[4+1]), tPar[5+1])
		iSpheres = iSpheres + 1
	elseif (tPar[2+1] == "Camera") then
		--addCamera(<sCameraName>, <tTarget>, <tOrigin>)
		addCamera(tPar[3+1], tPar[5+1], vaddV(tCoo, tPar[4+1]))
		iCameras = iCameras + 1
	elseif (tPar[2+1] == "Squadron") then
		--addSquadron(<sSquadronName>, <sSquadronType>, <tPosition>, <iPlayerIndex>, <tRotation>, <iNumberShips>, <bHyperspace>)
		addSquadron(tPar[3+1], tPar[4+1], vaddV(tCoo, tPar[5+1]), tPar[6+1], tPar[7+1], tPar[8+1], tPar[9+1])
		iSquadrons = iSquadrons + 1
	elseif (tPar[2+1] == "Asteroid") then
		--addAsteroid(<sAsteroidType>, <tPosition>, <fRU>, ?, ?, ?, ?)
		addAsteroid(tPar[3+1], vaddV(tCoo, tPar[4+1]), tPar[5+1], tPar[6+1], tPar[7+1], tPar[8+1], tPar[9+1])
		iAsteroids = iAsteroids + 1
	elseif (tPar[2+1] == "Salvage") then
		--addSalvage(<sChunkType>, <tPosition>, <fRU>, ?, ?, ?, ?)
		addSalvage(tPar[3+1], vaddV(tCoo, tPar[4+1]), tPar[5+1], tPar[6+1], tPar[7+1], tPar[8+1], tPar[9+1])
		iSalvage = iSalvage + 1
	elseif (tPar[2+1] == "Pebble") then
		--addPebble(<sPebbleType>, <tPosition>, ?, ?, ?)
		addPebble(tPar[3+1], vaddV(tCoo, tPar[4+1]), tPar[5+1], tPar[6+1], tPar[7+1])
		iPebbles = iPebbles + 1
	elseif (tPar[2+1] == "Cloud") then
		--addCloud(<sObjName>, <sCloudType>, <tPosition>, <tColor>, ?, <fSize>)
		addCloud(tPar[3+1], tPar[4+1], vaddV(tCoo, tPar[5+1]), tPar[6+1], tPar[7+1], tPar[8+1])
		iClouds = iClouds + 1
	elseif (tPar[2+1] == "DustCloud") then
		--addDustCloud(<sObjName>, <sDustCloudType>, <tPosition>, <tColor>, ?, <fSize>)
		addDustCloud(tPar[3+1], tPar[4+1], vaddV(tCoo, tPar[5+1]), tPar[6+1], tPar[7+1], tPar[8+1])
		iDustClouds = iDustClouds + 1
	elseif (tPar[2+1] == "Nebula") then
		--addNebula(<sNebulaName>, <sNebulaType>, <tPosition>, <tColor>, ?, <fSize>)
		addNebula(tPar[3+1], tPar[4+1], vaddV(tCoo, tPar[5+1]), tPar[6+1], tPar[7+1], tPar[8+1])
		iNebulas = iNebulas + 1
	elseif (tPar[2+1] == "DirLight") then
		--createDirLight(<sLightName>, <tPosition>, <tColour>)
		createDirLight(tPar[3+1], vaddV(tCoo, tPar[4+1]), tPar[5+1])
		--setLightSpecular(<sLightName>, <tSpecular>)
		setLightSpecular(tPar[3+1], tPar[6+1])
		iDirLights = iDirLights + 1
	elseif (tPar[2+1] == "RvSquadron") then
		local sobgroupname = ""
		for i, iCount in SOBGroups do
			for j = 1, getn(iCount) do
				if (tPar[2] == iCount[j][1]) then
					sobgroupname = i
					break
				end
			end
			if (sobgroupname ~= "") then
				break
			end
		end
		-- HW2 complains when I add this to a skirmish map. Is my syntax correct, or does it only work in singleplayer?
		--addReactiveFleetSlot(<sSobGroupName>, <iPlayerIndex>, ?, <tPosition>, ?, ?, ?, <sShipType>)
		addReactiveFleetSlot(sobgroupname, tPar[6+1], tPar[7+1], vaddV(tCoo, tPar[4+1]), tPar[8+1], tPar[9+1], tPar[10+1], tPar[3+1])
		iRvSquadrons = iRvSquadrons + 1
	elseif (tPar[2+1] == "RvResource") then
		--addReactiveFleetResourceSlot(<sResourceType>, <tPos>, ?, ?, ?)
		addReactiveFleetResourceSlot(tPar[3+1], vaddV(tCoo, tPar[4+1]), tPar[5+1], tPar[6+1], tPar[7+1])
		iRvResources = iRvResources + 1
	elseif (tPar[2+1] == "Coordinate") then
		tinsert(tPar[3], tCoo)
	elseif (tPar[2+1] == "Function") then
		if (tPar[7+1] == nil) then
			tPar[7+1] = {0,0,0,}
		end
		local nfour = tPar[4+1]
		if tPar[3+1] ~= literalAdd then
			nfour = vaddV(tCoo, tPar[4+1])
		end
		tPar[3+1](nfour, tPar[5+1], tPar[6+1], vaddV(tRot, tPar[7+1]))
	end
end

function addSOBGroup(sSobName, ...)
	createSOBGroup(sSobName)
	for i = 1, getn(arg) do
		addToSOBGroup(arg[i], sSobName)
	end
end

function doAllSOBGroups(ttable)
	for sobgname, sobgarray in ttable do
		createSOBGroup(sobgname)
		for j = 1, getn(sobgarray) do
			local thisitem = sobgarray[j]
			if (thisitem[4] == 0) then
				addToSOBGroup(thisitem[0], sobgname)
			end
		end
	end
end

-- Damn. Can't use the "call" or "dostring" functions here... Useless.
function doAllPaths(ttable)
	for pathname, patharray in ttable do
		for j = 1, getn(patharray) do
			local thispoint = patharray[j]
			if thispoint[2] == 1 then
--				addToSOBGroup(thisship[1], sobgname)
			else
				for k = 1, thispoint[2] do
--					addToSOBGroup(thisship[1] .. "_" .. k, sobgname)
				end
			end
		end
	end
end

function literalAdd(tDst)
	for i, tTab in tDst do
		for j = 1, tTab[1] do
			appendShape({0, 0, 0,}, i, tTab, j, {0, 0, 0,}, {0, 0, 0,})
		end
	end
end

function randomMusic(iMod, tTab, iLen, sDir)
	local ranNum, musDir, musTrk = 0, "", ""
	local musTab =
	{
		"amb_01", "amb_02", "amb_03", "amb_04", "amb_05", "amb_06", "amb_07", "amb_08", "amb_09", "amb_10", "amb_11", "amb_12", "amb_13", "amb_14",
		"battle_01", "battle_04", "battle_04_alt", "battle_06", "battle_keeper", "battle_movers", "battle_planetkillers", "battle_sajuuk", "bentus_arrival",
	}
	if ((iMod == 4) or (iMod == 5)) then
		for k = 1, iLen do
			musTab[k + 23] = tTab[k]
		end
	end
	if (iMod == 1) then
		ranNum = random(1, 14)
	elseif (iMod == 2) then
		ranNum = random(15, 23)
	elseif (iMod == 3) then
		ranNum = random(1, 23)
	elseif (iMod == 4) then
		ranNum = random(24, 23 + iLen)
	elseif (iMod == 5) then
		ranNum = random(1, 23 + iLen)
	end
	if (ranNum <= 14) then
		musDir = "data:sound\\music\\ambient\\"
	elseif (ranNum <= 23) then
		musDir = "data:sound\\music\\battle\\"
	elseif (ranNum <= (23 + iLen)) then
		musDir = sDir
	end
	if (iMod ~= 0) then
		setDefaultMusic(musDir .. musTab[ranNum])
	end
end

function randomBackground(iMod, tTab, iLen)
	local ranNum = 0
	local backgroundTable =
	{
		"m01", "m02", "m03", "m04", "m05", "m06", "m07", "m08", "m09", "m10", "m11", "m12", "m13", "m14", "m15",
		"planet", "quick", "singlesun", "tanis", "taniswstars", "black", "white",
	}
	if ((iMod == 4) or (iMod == 5)) then
		for k = 1, iLen do
			backgroundTable[k + 22] = tTab[k]
		end
	end
	if (iMod == 1) then
		ranNum = random(1, 15)
	elseif (iMod == 2) then
		ranNum = random(16, 22)
	elseif (iMod == 3) then
		ranNum = random(1, 22)
	elseif (iMod == 4) then
		ranNum = random(23, 22 + iLen)
	elseif (iMod == 5) then
		ranNum = random(1, 23 + iLen)
	end
	if (iMod ~= 0) then
		loadBackground(backgroundTable[ranNum])
	end
end

function randomSign()
	if (random() > 0.5) then
		return 1
	else
		return -1
	end
end

function randomBit()
	if (random() > 0.5) then
		return 1
	else
		return 0
	end
end

function random2(fVal1, fVal2)
	if (fVal2) then
		if ((fVal2 - fVal1) == 0) then
			return fVal2
		else
			return random(fVal1, fVal2)
		end
	elseif (fVal1) then
		if (fVal1 == 0) then
			return 0
		else
			return random(fVal1)
		end
	else
		return random()
	end
end

function random3(fVal1, fVal2)
	if (fVal2) then
		return fVal1 + random() * (fVal2 - fVal1)
	elseif (fVal1) then
		return random() * fVal1
	else
		return random()
	end
end

function vaddV(tVec1, tVec2)
	local tmpVec = {}
	for i, tTab in tVec2 do
		tmpVec[i] = tVec1[i] + tTab
	end
	return tmpVec
end

if not getn then
	function getn(tTable)
		local nCount = 0
		for i, iCount in tTable do
			if i ~= "n" then
				nCount = nCount + 1
			end
		end
		return nCount
	end
end

if not tinsert then
	function tinsert(tTable, Arg1, Arg2)
		if (Arg2) then
			local TempTable = {}
			for i = Arg1, getn(tTable) do
				TempTable[i + 1] = tTable[i]
			end
			for i = Arg1, getn(tTable) do
				tTable[i + 1] = TempTable[i + 1]
			end
			tTable[Arg1] = Arg2
		else
			tTable[getn(tTable) + 1] = Arg1
		end
	end
end

function vrotate(tVec, tAng)
	tVec =
	{
		tVec[1] * cos(tAng[3]) - tVec[2] * sin(tAng[3]),
		tVec[1] * sin(tAng[3]) + tVec[2] * cos(tAng[3]),
		tVec[3],
	}
	tVec =
	{
		tVec[1],
		tVec[2] * cos(tAng[1]) - tVec[3] * sin(tAng[1]),
		tVec[2] * sin(tAng[1]) + tVec[3] * cos(tAng[1]),
	}
	tVec =
	{
		tVec[1] * cos(tAng[2]) + tVec[3] * sin(tAng[2]),
		tVec[2],
		-1 * tVec[1] * sin(tAng[2]) + tVec[3] * cos(tAng[2]),
	}
	return tVec
end
