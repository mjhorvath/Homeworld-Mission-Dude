------------------------------------------------------------------------Objects


iStartPoints, iPoints, iSpheres, iCameras, iSquadrons, iAsteroids, iSalvage, iPebbles, iClouds, iDustClouds, iNebulas, iDirLights, iRvResources, iRvSquadrons, iAmbientLights = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

GlobDist = {Main = {},tableorder = {"Main",},}
GlobLght = {Spec = {}, Col = {},}

function dofilepath(in_string)
--	error("Homeworld 2's \"dofilepath\" function is not supported by MissionDude. Please adjust your map accordingly in a text editor.\n")
end

function addPoint(sName, tPosition, tRotation)
	if checkfordistribution() == 0 then
		if strfind(sName, "StartPos", 1, 1) ~= nil then
			iStartPoints = iStartPoints + 1
			tinsert(GlobDist.Main, {1,"StartPoint_"..iStartPoints,"StartPoint",sName,tPosition,tRotation,})
		else
			iPoints = iPoints + 1
			tinsert(GlobDist.Main, {1,"Point_"..iPoints,"Point",sName,tPosition,tRotation,})
		end
	end
end

function addPebble(sType, tPosition, nUnknown1, nUnknown2, nUnknown3)
	if checkfordistribution() == 0 then
		iPebbles = iPebbles + 1
		tinsert(GlobDist.Main, {1,"Pebble_"..iPebbles,"Pebble",sType,tPosition,nUnknown1,nUnknown2,nUnknown3,})
	end
end

function addAsteroid(sType, tPosition, fRU, fRotX, fRotY, fRotZ, nUnknown1)
	if checkfordistribution() == 0 then
		iAsteroids = iAsteroids + 1
		tinsert(GlobDist.Main, {1,"Asteroid_"..iAsteroids,"Asteroid",sType,tPosition,fRU,fRotX,fRotY,fRotZ,nUnknown1,})
	end
end

function addSalvage(sType, tPosition, fRU, fRotX, fRotY, fRotZ, nUnknown1)
	if checkfordistribution() == 0 then
		iSalvage = iSalvage + 1
		tinsert(GlobDist.Main, {1,"Salvage_"..iSalvage,"Salvage",sType,tPosition,fRU,fRotX,fRotY,fRotZ,nUnknown1,})
	end
end

function addCamera(sName, tTarget, tPosition)
	if checkfordistribution() == 0 then
		iCameras = iCameras + 1
		tinsert(GlobDist.Main, {1,"Camera_"..iCameras,"Camera",sName,tTarget,tPosition,})
	end
end

function addCloud(sName, sType, tPosition, tColor, nUnknown, fSize)
	if checkfordistribution() == 0 then
		iClouds = iClouds + 1
		tinsert(GlobDist.Main, {1,"Cloud_"..iClouds,"Cloud",sName,sType,tPosition,tColor,nUnknown,fSize,})
	end
end

function addDustCloud(sName, sType, tPosition, tColor, nUnknown, fSize)
	if checkfordistribution() == 0 then
		iDustClouds = iDustClouds + 1
		tinsert(GlobDist.Main, {1,"DustCloud_"..iDustClouds,"DustCloud",sName,sType,tPosition,tColor,nUnknown,fSize,})
	end
end

function addNebula(sName, sType, tPosition, tColor, nUnknown, fSize)
	if checkfordistribution() == 0 then
		iNebulas = iNebulas + 1
		tinsert(GlobDist.Main, {1,"Nebula_"..iNebulas,"Nebula",sName,sType,tPosition,tColor,nUnknown,fSize,})
	end
end

function addSphere(sName, tPosition, fRadius)
	if checkfordistribution() == 0 then
		iSpheres = iSpheres + 1
		tinsert(GlobDist.Main, {1,"Sphere_"..iSpheres,"Sphere",sName,tPosition,fRadius,})
	end
end

function addSquadron(sName, sType, tPosition, iPlayerIndex, tRotation, iNumberShips, bHyperspace)
	if checkfordistribution() == 0 then
		iSquadrons = iSquadrons + 1
		tinsert(GlobDist.Main, {1,"Squadron_"..iSquadrons,"Squadron",sName,sType,tPosition,iPlayerIndex,tRotation,iNumberShips,bHyperspace,})
	end
end

function addReactiveFleetSlot(sSobGroup, iPlayer, nUnknown1, tPosition, nUnknown2, nUnknown3, nUnknown4, sType)
--	if checkfordistribution() == 0 then
--		iRvSquadrons = iRvSquadrons + 1
--		tinsert(GlobDist.Main, {1,"RvSquadron_"..iRvSquadrons,"RvSquadron",sType,tPosition,sSobGroup,iPlayer,nUnknown1,nUnknown2,nUnknown3,nUnknown4,})
--	end
end

function addReactiveFleetResourceSlot(sType, tPosition, nUnknown1, nUnknown2, nUnknown3)
--	if checkfordistribution() == 0 then
--		iRvResources = iRvResources + 1
--		tinsert(GlobDist.Main, {1,"RvResource_"..iRvResources,"RvResource",sType,tPosition,nUnknown1,nUnknown2,nUnknown3,})
--	end
end

function createDirLight(sName, tPosition, tColor)
	if checkfordistribution() == 0 then
		iDirLights = iDirLights + 1
		tinsert(GlobDist.Main, {1,"DirLight_"..iDirLights,"DirLight",sName,tPosition,tColor,{0,0,0,},})
	end
end

function createAmbientLight(sName, tDiffuse)
--	if checkfordistribution() == 0 then
--		iAmbientLights = iAmbientLights + 1
--		tinsert(GlobDist.Main, {1,"AmbientLight_"..iAmbientLights,"AmbientLight",sName,tDiffuse,})
--	end
end

function setLightSpecular(sName, tSpecular)
	tinsert(GlobLght.Spec, {sName,tSpecular,})
end

function setLightColour(sName, tDiffuse)
--	tinsert(GlobLght.Col, {sName,tDiffuse,})
end

function addAmbientSound(sPath, tTable)end
function addResourcePatch()end
function addMissile()end


----------------------------------------------------------------------Level Settings


GlobLevl = {}

function setWorldBoundsInner(tPosition, tDimensions)
	GlobLevl.setWorldBoundsInner = {Position = tPosition, Size = tDimensions,}
end

function setWorldBoundsOuter(tPosition, tDimensions)
	GlobLevl.setWorldBoundsOuter = {Position = tPosition, Size = tDimensions,}
end

function setSensorsManagerCameraDistances(fMinDistance, fMaxDistance)
	GlobLevl.setSensorsManagerCameraDistances = {MinDistance = {fMinDistance}, MaxDistance = {fMaxDistance},}
end

function setLevelShadowColour(fR, fG, fB, fA)
	GlobLevl.setLevelShadowColour = {R = {fR}, G = {fG}, B = {fB}, A = {fA},}
end

function setGlareIntensity(fIntensity)
	GlobLevl.setGlareIntensity = {Intensity = {fIntensity},}
end

function setNebulaAmbient(tAmbientColor)
	GlobLevl.setNebulaAmbient = {AmbientColor = tAmbientColor}
end

function setFXWind(tVector)
	GlobLevl.setFXWind = {Vector = tVector,}
end

function setDustCloudAmbient(tAmbientColor)
	GlobLevl.setDustCloudAmbient = {AmbientColor = tAmbientColor,}
end

function setDefaultMusic(sScriptName)
	local string1 = strsub(sScriptName, strfind(sScriptName, "music", 1, 1) + 6, -1)
	local string2 = strsub(string1, 1, strfind(string1, "[/\\]") - 1)
	local string3 = strsub(string1, strfind(string1, "[/\\]") + 1, -1)
	GlobLevl.setDefaultMusic = {Folder = {string2}, TrackName = {string3},}
end

function playBgLightAnim(sRefFxName)
--	GlobLevl.playBgLightAnim = {EffectName = {sRefFxName},}
end

function loadBackground(sBackgroundName)
	GlobLevl.loadBackground = {Path = {sBackgroundName},}
end

function fogSetType(sFogType)
	GlobLevl.fogSetType = {FogType = {sFogType},}
end

function fogSetStart(fStart)
	GlobLevl.fogSetStart = {Start = {fStart},}
end

function fogSetEnd(fEnd)
	GlobLevl.fogSetEnd = {End = {fEnd},}
end

function fogSetDensity(fDensity)
	GlobLevl.fogSetDensity = {Density = {fDensity},}
end

function fogSetColour(fR, fG, fB, fA)
	GlobLevl.fogSetColour = {R = {fR}, G = {fG}, B = {fB}, A = {fA},}
end

function fogSetActive(bActive)
	GlobLevl.fogSetActive = {Enable = {bActive},}
end

function fogAddInterpolator(sBuffer, fDuration, fTarget)
	GlobLevl.fogAddInterpolator = {Buffer = {sBuffer}, Duration = {fDuration}, Target = {fTarget},}
end

function setMusicPath(sPath)end
function addAxisAlignBox(aUnknown, bUnknown, cUnknown)end
function setSensorsThreshold()end
function setUseLighting()end
function setMaxCameraDistance()end


----------------------------------------------------------------------Sobgroups


GlobSobg = {tableorder = {},}

function createSOBGroup(sSobGroupName)
--	if not GlobSobg[sSobGroupName] then
--		GlobSobg[sSobGroupName] = {}
--	end
--	tinsert(GlobSobg.tableorder, sSobGroupName)
end

function addToSOBGroup(sSquadronName, sSobGroupName)
--	if checkforsobgroups() == 0 then
--		if not GlobSobg[sSobGroupName] then
--			GlobSobg[sSobGroupName] = {}
--		end
--		tinsert(GlobSobg[sSobGroupName], {sSquadronName,1,})
--	end
end


----------------------------------------------------------------------Paths


GlobPath = {tableorder = {},}

function addPath(sPathName, ...)
--	if not GlobPath[sPathName] then
--		GlobPath[sPathName] = {}
--	end
--	for index, object in arg do
--		if index ~= "n" then
--			tinsert(GlobPath[sPathName], {object,1,})
--		end
--	end
--	tinsert(GlobPath.tableorder, sPathName)
end


----------------------------------------------------------------------Processing


distcheck = 0
function checkfordistribution()
--	if not AppVersion or AppVersion < 1.4 then
	if not AppVersion then
		return 0
	end
	local i = 1
	local appendcheck = 0
	while getinfo(i) ~= nil do
		if (getinfo(i).name == "appendShape") then
			if distcheck == 1 then
				return 1
			else
				appendcheck = 1
			end
		end
		if (appendcheck == 1) and (getinfo(i).name == "DetermChunk") then
			local j = 1
			while getlocal(i, j) ~= nil do
				local name, value = getlocal(i, j)
				if (name == "Distributions") then
					for idx1, obj1 in value do
						if not GlobDist[idx1] then
							tinsert(GlobDist.tableorder, idx1)
						end
						if idx1 == "Main" then
							for idx2, obj2 in obj1 do
								tinsert(GlobDist[idx1], obj2)
							end
						else
							GlobDist[idx1] = obj1
						end
					end
					distcheck = 1
					return 1
				end
				j = j + 1
			end
		end
		i = i + 1
	end
	return 0
end

sobgcheck = 0
function checkforsobgroups()
--	if not AppVersion or AppVersion < 1.4 then
	if not AppVersion then
		return 0
	end
	local i = 1
	local doallcheck = 0
	while getinfo(i) ~= nil do
		if getinfo(i).name == "doAllSOBGroups" then
			if sobgcheck == 1 then
				return 1
			else
				doallcheck = 1
			end
		end
		if doallcheck == 1 and getinfo(i).name == "DetermChunk" then
			local j = 1
			while getlocal(i, j) ~= nil do
				local name, value = getlocal(i, j)
				if (name == "SOBGroups") then
					for idx1, obj1 in value do
						GlobSobg[idx1] = obj1
					end
					sobgcheck = 1
					return 1
				end
				j = j + 1
			end
		end
		i = i + 1
	end
	return 0
end

objectstrings =
{
	Asteroid = 1,
	Camera = 1,
	Cloud = 1,
	DustCloud = 1,
	Nebula = 1,
	Point = 1,
	StartPoint = 1,
	Pebble = 1,
	Salvage = 1,
	Sphere = 1,
	Squadron = 1,
	Missile = 1,
	DirLight = 1,
	RvSquadron = 1,
	RvAsteroid = 1,
	AbientSound = 1,
	Coordinate = 1,
	-- functions
	branchAdd = {"Branch",1,},
	splineAdd = {"Spline",1,},
	ringAdd = {"Ring",1,},
	globeAdd = {"Globe",1,},
	shapeAdd = {"Shape",1,},
	spiralAdd = {"Spiral",1,},
	literalAdd = {"Literal",1,},
	easyPatch = {"EasyPatch",1,},
}

function matchlights()
	for idx1 = 1, getn(GlobLght.Spec) do
		local obj1 = GlobLght.Spec[idx1]
		local label1 = obj1[1]
		for idx2 = 1, getn(GlobDist.Main) do
			local obj2 = GlobDist.Main[idx2]
			local type2, label2 = obj2[2], obj2[3]
			if type2 == "DirLight" then
				if label1 == label2 then
					GlobDist.Main[idx2][6] = obj1[2]
					break
				end
			end
		end
	end
end

DistArr = {}
--"Distributions", GlobDist
function parsedistribution(thisname, thistable)
	tinsertmany(DistArr, thisname, " =\n{\n")
	for idx1 = 1, getn(thistable.tableorder) do
		local tableindex, Prefix = thistable.tableorder[idx1], "\t"
		tinsertmany(DistArr, Prefix, "\"", tableindex, "\":\n", Prefix, "[\n")
		for idx2 = 1, getn(thistable[tableindex]) do
			local obj2 = thistable[tableindex][idx2]
			local Prefix, isfunction = "\t\t", 0
			local objtype = obj2[2+1]
			-- reactive fleets and asteroids are no longer supported
			if (objtype ~= "RvAsteroid") and (objtype ~= "RvSquadron") and (objtype ~= "Function") then
				tinsertmany(DistArr, Prefix, "{")
				if objtype == "StartPoint" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"\"],",
						"Translation:[", parsesubtable(obj2[4+1]), "],",
						"Rotation:[", parsesubtable(obj2[5+1]), "],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[null],",
						"Amount:[", obj2[1], "],"
					)
					objectstrings[obj2[2+1]] = objccount + 1
				elseif objtype == "Point" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"\"],",
						"Translation:[", parsesubtable(obj2[4+1]), "],",
						"Rotation:[", parsesubtable(obj2[5+1]), "],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[\"", obj2[3+1], "\"],",
						"Amount:[", obj2[1], "],"
					)
--					for idx3 = 1, getn(GlobPath.tableorder) do
--						local tableindex = GlobPath.tableorder[idx3]
--						for idx4 = 1, getn(GlobPath[tableindex]) do
--							if GlobPath[tableindex][idx4] and obj2[1] > 1 then
--								for index5 = 1, obj2[1] do
--									if GlobPath[tableindex][idx4][1] == obj2[3+1] .. "_" .. index5 then
--										if index5 == 1 then
--											GlobPath[tableindex][idx4] = {obj2[3+1],obj2[1],}
--										else
--											GlobPath[tableindex][idx4] = nil
--											break
--										end
--									end
--								end
--							end
--						end
--					end
					objectstrings[obj2[2+1]] = objccount + 1
				elseif objtype == "Sphere" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"\"],",
						"Translation:[", parsesubtable(obj2[4+1]), "],",
						"Rotation:[0,0,0],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[\"", obj2[3+1], "\"],",
						"Amount:[", obj2[1], "],",
						"Radius:[", obj2[5+1], "],"
					)
					objectstrings[obj2[2+1]] = objccount + 1
				elseif objtype == "Asteroid" or obj2[2+1] == "Salvage" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"", obj2[3+1], "\"],",
						"Translation:[", parsesubtable(obj2[4+1]), "],",
						"Rotation:[0,0,0],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[\"\"],",
						"Amount:[", obj2[1], "],",
						"RUValue:[", obj2[5+1], "],",
						"Unknown1:[", obj2[6+1], "],",
						"Unknown2:[", obj2[7+1], "],",
						"Unknown3:[", obj2[8+1], "],",
						"Unknown4:[", obj2[9+1], "],"
					)
					objectstrings[obj2[2+1]] = objccount + 1
				elseif objtype == "Pebble" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"", obj2[3+1], "\"],",
						"Translation:[", parsesubtable(obj2[4+1]), "],",
						"Rotation:[0,0,0],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[\"\"],",
						"Amount:[", obj2[1], "],",
						"Unknown1:[", obj2[5+1], "],",
						"Unknown2:[", obj2[6+1], "],",
						"Unknown3:[", obj2[7+1], "],"
					)
					objectstrings[obj2[2+1]] = objccount + 1
				elseif objtype == "Camera" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"\"],",
						"Translation:[", parsesubtable(obj2[4+1]), "],",
						"Rotation:[0,0,0],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[\"", obj2[3+1], "\"],",
						"Amount:[", obj2[1], "],",
						"Target:[", parsesubtable(obj2[5+1]), "],"
					)
					objectstrings[obj2[2+1]] = objccount + 1
				elseif objtype == "Cloud" or objtype == "DustCloud" or objtype == "Nebula" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"", obj2[4+1], "\"],",
						"Translation:[", parsesubtable(obj2[5+1]), "],",
						"Rotation:[0,0,0],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[\"", obj2[3+1], "\"],",
						"Amount:[", obj2[1], "],",
						"Color:[", parsesubtable(obj2[6+1]), "],",
						"Unknown1:[", obj2[7+1], "],",
						"Radius:[", obj2[8+1], "],"
					)
					objectstrings[obj2[2+1]] = objccount + 1
				elseif objtype == "Squadron" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"", obj2[4+1], "\"],",
						"Translation:[", parsesubtable(obj2[5+1]), "],",
						"Rotation:[", parsesubtable(obj2[7+1]), "],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[\"", obj2[3+1], "\"],",
						"Amount:[", obj2[1], "],",
						"Player:[", obj2[6+1], "],",
						"Unknown1:[", obj2[8+1], "],",
						"Hyperspace:[", obj2[9+1], "],"
					)
--					local matchitem = 0
--					for idx3 = 1, getn(GlobSobg.tableorder) do
--						local tableindex = GlobSobg.tableorder[idx3]
--						for idx4 = 1, getn(GlobSobg[tableindex]) do
--							if GlobSobg[tableindex][idx4][1] == obj2[3+1] then
--								GlobSobg[tableindex][idx4] = {obj2[3+1],obj2[1],obj2[6+1],0}
--								matchitem = 1
--								break
--							end
--						end
--						if matchitem == 1 then
--							break
--						end
--					end
					objectstrings[obj2[2+1]] = objccount + 1
				elseif objtype == "DirLight" then
					local objccount = objectstrings[obj2[2+1]]
					tinsertmany
					(
						DistArr,
						"Type:[\"", obj2[2+1], "\"],",
						"Subtype:[\"\"],",
						"Translation:[", parsesubtable(obj2[4+1]), "],",
						"Rotation:[0,0,0],",
						"Label:[\"", obj2[2], "\"],",
						"Name:[\"", obj2[3+1], "\"],",
						"Amount:[", obj2[1], "],",
						"Color:[", parsesubtable(obj2[5+1]), "],",
						"Specular:[", parsesubtable(obj2[6+1]), "],"
					)
					objectstrings[obj2[2+1]] = objccount + 1
--				elseif objtype == "RvSquadron" then
--					local objccount = objectstrings[obj2[2+1]]
--					tinsertmany
--					(
--						DistArr,
--						"Type:[\"", obj2[2+1], "\"],",
--						"Subtype:[\"", obj2[3+1], "\"],",
--						"Translation:[", parsesubtable(obj2[4+1]), "],",
--						"Rotation:[0,0,0],",
--						"Label:[\"", obj2[2], "\"],",
--						"Name:[\"\"],",
--						"Amount:[", obj2[1], "],",
--						"SobGroup:[\"", obj2[6+1], "\"],",
--						"Player:[", obj2[7+1], "],",
--						"Unknown1:[", obj2[8+1], "],",
--						"Unknown2:[", obj2[9+1], "],",
--						"Unknown3:[", obj2[10+1], "],",
--						"Unknown4:[", obj2[11+1], "],"
--					)
--					local matchitem = 0
--					for idx3 = 1, getn(GlobSobg[obj2[5+1]]) do
--						if GlobSobg[obj2[5]][idx3][1] == obj2[2+1] .. " #" .. objccount then
--							matchitem = 1
--							break
--						end
--					end
--					if matchitem == 0 then
--						GlobSobg[obj2[5+1]][getn(GlobSobg[obj2[5+1]]) + 1] = {obj2[2+1], " #", objccount,obj2[1],obj2[6+1],1}
--					end
--					objectstrings[obj2[2+1]] = objccount + 1
--				elseif objtype == "RvAsteroid" then
--					local objccount = objectstrings[obj2[2+1]]
--					tinsertmany
--					(
--						DistArr,
--						"Type:[\"", obj2[2+1], "\"],",
--						"Subtype:[\"", obj2[3+1], "\"],",
--						"Translation:[", parsesubtable(obj2[4+1]), "],",
--						"Rotation:[0,0,0],",
--						"Label:[\"", obj2[2], "\"],",
--						"Name:[\"\"],",
--						"Amount:[", obj2[1], "],",
--						"Unknown1:[", obj2[5+1], "],",
--						"Unknown2:[", obj2[6+1], "],",
--						"Unknown3:[", obj2[7+1], "],"
--					)
--					objectstrings[obj2[2+1]] = objccount + 1
--				elseif objtype == "Function" then
--					local funcname = getinfo(obj2[3+1]).name
--					local functype, funccount, funcsubtype, funcdist = objectstrings[funcname][1], objectstrings[funcname][2], "", ""
--					tinsertmany(DistArr, "Type:[\"", functype, "\"],")
--					if functype == "Shape" then
--						funcsubtype = obj2[6+1][1]
--					elseif functype == "Spiral" then
--						funcsubtype = obj2[6+1][1]
--					end
--					tinsertmany
--					(
--						DistArr,
--						"Subtype:[\"", funcsubtype, "\"],",
--						"Label:[\"", obj2[2], "\"],",
--						"Name:[\"\"],",
--						"Amount:[", obj2[1], "],"
--					)
--					local tempdist = obj2[5+1]
--					if functype == "Literal" then
--						tempdist = obj2[4+1]
--					end
--					for idx1again, obj1again in thistable do
--						if (tempdist == obj1again) then
--							funcdist = idx1again
--							break
--						end
--					end
--					if functype ~= "EasyPatch" then
--						tinsertmany(DistArr, "Distribution:[\"", funcdist, "\"],")
--					end
--					if functype == "Branch" then
--						tinsertmany
--						(
--							DistArr,
--							"Translation:[", parsesubtable(obj2[4+1]), "],",
--							"Rotation:[", parsesubtable(obj2[7+1]), "],",
--							"Divisions:[", parsesubtable(obj2[6+1][1]), "],",
--							"Intervals:[", parsesubtable(obj2[6+1][2]), "],",
--							"Frequency:[", parsesubtable(obj2[6+1][3]), "],",
--							"Beginning:[", parsesubtable(obj2[6+1][4]), "],",
--							"Ending:[", parsesubtable(obj2[6+1][5]), "],",
--							"Radii:[", parsesubtable(obj2[6+1][6]), "],",
--							"Lengths:[", parsesubtable(obj2[6+1][7]), "],",
--							"Thicknesses:[", parsesubtable(obj2[6+1][8]), "],",
--							"Angles:[", parsesubtable(obj2[6+1][9]), "],",
--							"Mode:[", obj2[6+1][10], "],"
--						)
--					elseif functype == "Spline" then
--						tinsertmany
--						(
--							DistArr,
--							"Translation:[", parsesubtable(obj2[4+1]), "],",
--							"Rotation:[", parsesubtable(obj2[7+1]), "],",
--							"Point1A:[", parsesubtable(obj2[6+1][1]), "],",
--							"Point1B:[", parsesubtable(obj2[6+1][2]), "],",
--							"Point2A:[", parsesubtable(obj2[6+1][3]), "],",
--							"Point2B:[", parsesubtable(obj2[6+1][4]), "],",
--							"Radii:[", parsesubtable(obj2[6+1][5]), "],",
--							"Thicknesses:[", parsesubtable(obj2[6+1][6]), "],"
--						)
--					elseif functype == "Ring" then
--						tinsertmany
--						(
--							DistArr,
--							"Translation:[", parsesubtable(obj2[4+1]), "],",
--							"Rotation:[", parsesubtable(obj2[7+1]), "],",
--							"Axis1:[", obj2[6+1][1], "],",
--							"Axis2:[", obj2[6+1][2], "],",
--							"Thickness:[", obj2[6+1][3], "],",
--							"Height:[", obj2[6+1][4], "],",
--							"Arc:[", parsesubtable(obj2[6+1][5]), "],",
--							"Mode:[", obj2[6+1][6], "],"
--						)
--					elseif functype == "Globe" then
--						tinsertmany
--						(
--							DistArr,
--							"Translation:[", parsesubtable(obj2[4+1]), "],",
--							"Rotation:[", parsesubtable(obj2[7+1]), "],",
--							"Radius:[", obj2[6+1][1], "],",
--							"Latitude:[", obj2[6+1][2], "],",
--							"Longitude:[", obj2[6+1][3], "],",
--							"Thickness:[", obj2[6+1][4], "],",
--							"Height:[", obj2[6+1][5], "],",
--							"Arc:[", parsesubtable(obj2[6+1][6]), "],",
--							"Mode:[", obj2[6+1][7], "],"
--						)
--					elseif functype == "Shape" then
--						tinsertmany
--						(
--							DistArr,
--							"Translation:[", parsesubtable(obj2[4+1]), "],",
--							"Rotation:[", parsesubtable(obj2[7+1]), "],",
--							"ParamA:[", obj2[6+1][2], "],",
--							"ParamB:[", obj2[6+1][3], "],",
--							"ParamC:[", obj2[6+1][4], "],",
--							"ParamD:[", obj2[6+1][5], "],",
--							"ParamE:[", obj2[6+1][6], "],"
--						)
--					elseif functype == "Spiral" then
--						tinsertmany
--						(
--							DistArr,
--							"Translation:[", parsesubtable(obj2[4+1]), "],",
--							"Rotation:[", parsesubtable(obj2[7+1]), "],",
--							"Radius:[", obj2[6+1][2], "],",
--							"Arms:[", obj2[6+1][3], "],",
--							"Revolutions:[", obj2[6+1][4], "],",
--							"Angle:[", obj2[6+1][5], "],",
--							"Height:[", obj2[6+1][6], "],",
--							"Width:[", obj2[6+1][7], "],",
--							"Thickness:[", obj2[6+1][8], "],",
--							"TValues:[", parsesubtable(obj2[6+1][9]), "],",
--							"Mode:[", obj2[6+1][10], "],"
--						)
--					elseif functype == "EasyPatch" then
--						tinsertmany
--						(
--							DistArr,
--							"Translation:[", parsesubtable(obj2[4+1]), "],",
--							"Rotation:[0,0,0],",
--							"RUValue:[", obj2[5+1], "],"
--						)
--					elseif functype == "Literal" then
--						tinsertmany
--						(
--							DistArr,
--							"Translation:[0,0,0],",
--							"Rotation:[0,0,0],"
--						)
--					end
--					objectstrings[funcname][2] = funccount + 1
				end
				trimlastcommarray(DistArr)
				tinsert(DistArr, "},\n")
			end
		end
		trimlastcommarray(DistArr)
		tinsertmany(DistArr, Prefix, "],\n")
	end
	trimlastcommarray(DistArr)
	tinsert(DistArr, "},\n")
end

LevlArr = {}
function parselevelsettings()
	tinsert(LevlArr, "LevelSettings =\n{\n")
	for idx1, obj1 in GlobLevl do
		local Prefix = "\t"
		tinsertmany(LevlArr, Prefix, idx1, ":\n", Prefix, "{\n")
		for idx2, obj2 in obj1 do
			local Prefix = "\t\t"
			tinsertmany(LevlArr, Prefix, idx2, ":[", parsesubtable(obj2), "],\n")
		end
		trimlastcommarray(LevlArr)
		tinsertmany(LevlArr, Prefix, "},\n")
	end
	trimlastcommarray(LevlArr)
	tinsert(LevlArr, "}\n")
end

SobgArr = {}
function parsesobgroups()
	tinsert(SobgArr, "SOBGroups =\n{\n")
	for idx1 = 1, getn(GlobSobg.tableorder) do
		local tableindex = GlobSobg.tableorder[idx1]
		local Prefix = "\t"
		tinsertmany(SobgArr, Prefix, "\"", tableindex, "\":\n", Prefix, "[\n")
		for idx2 = 1, getn(GlobSobg[tableindex]) do
			local obj2, Prefix = GlobSobg[tableindex][idx2], "\t\t"
			tinsertmany(SobgArr, Prefix, "[", parsesubtable(obj2), "],\n")
		end
		trimlastcommarray(SobgArr)
		tinsertmany(SobgArr, Prefix, "],\n")
	end
	trimlastcommarray(SobgArr)
	tinsert(SobgArr, "}\n")
end

PathArr = {}
function parsepaths()
	tinsert(PathArr, "Paths =\n{\n")
	for idx1 = 1, getn(GlobPath.tableorder) do
		local tableindex = GlobPath.tableorder[idx1]
		local Prefix = "\t"
		tinsertmany(PathArr, Prefix, "\"", tableindex, "\":\n", Prefix, "[\n")
		for idx2 = 1, getn(GlobPath[tableindex]) do
			local obj2, Prefix = GlobPath[tableindex][idx2], "\t\t"
			tinsertmany(PathArr, Prefix, "[", parsesubtable(obj2), "],\n")
		end
		trimlastcommarray(PathArr)
		tinsertmany(PathArr, Prefix, "],\n")
	end
	trimlastcommarray(PathArr)
	tinsert(PathArr, "}\n")
end

PlayArr = {}
function parseplayers()
	local playercount = 0
	tinsert(PlayArr, "Players =\n{\n")
	for idx1, obj1 in player do
		local playername = obj1.name
		if playername == "" then
			playername = "Player #" .. playercount
			playercount = playercount + 1
		end
		tinsertmany(PlayArr, "\"", playername, "\":{RaceID:[", obj1.raceID, "],StartingRUs:[", obj1.resources, "],StartPos:[", obj1.startPos, "]},")
	end
	trimlastcommarray(PlayArr)
	tinsert(PlayArr, "}\n")
end

HeadArr = {}
function parseheader()
	if MapAuthor then
		tinsertmany(HeadArr, "LevelAuthor = \"", tosafestring(MapAuthor), "\"\n")
	elseif LevelAuthor then
		tinsertmany(HeadArr, "LevelAuthor = \"", tosafestring(LevelAuthor), "\"\n")
	else
		tinsertmany(HeadArr, "LevelAuthor = defaultlevelauthor\n")
	end
	if CreatedDate then
		tinsertmany(HeadArr, "CreatedDate = \"", tosafestring(CreatedDate), "\"\n")
	end
	if UpdatedDate then
		tinsertmany(HeadArr, "UpdatedDate = \"", tosafestring(UpdatedDate), "\"\n")
	end
	if MapComments then
		tinsertmany(HeadArr, "LevelComments = \"", tosafestring(MapComments), "\"\n")
	elseif LevelComments then
		tinsertmany(HeadArr, "LevelComments = \"", tosafestring(LevelComments), "\"\n")
	else
		tinsertmany(HeadArr, "MapComments = \"\"\n")
	end
	if AppVersion then
		tinsertmany(HeadArr, "AppVersion = \"", AppVersion, "\"\n")
	end
	tinsertmany(HeadArr, "LevelDescription = \"", tosafestring(levelDesc), "\"\n")
end

function parsesubtable(subtable)
	local sstring = ""
	for idx = 1, getn(subtable) do
		local obj = subtable[idx]
		if type(obj) == "string" then
			obj = "\"" .. obj .. "\""
		end
		sstring = sstring .. obj .. ","
	end
	return trimlastcomma(sstring)
end

function trimlastcomma(sstring)
	if strsub(sstring, strlen(sstring) - 1, -1) == ",\n" then
		return strsub(sstring, 1, strlen(sstring) - 2) .. "\n"
	elseif strsub(sstring, strlen(sstring), -1) == "," then
		return strsub(sstring, 1, strlen(sstring) - 1)
	else
		return sstring
	end
end

function trimlastcommarray(ttable)
	ttable[getn(ttable)] = trimlastcomma(ttable[getn(ttable)])
end

function tosafestring(sstring)
	if (strfind(sstring, "\\\\") ~= nil) then
		return sstring
	end
	sstring = gsub(sstring, "\\", "\\\\")
	sstring = gsub(sstring, "\'", "\\\'")
	sstring = gsub(sstring, "\"", "\\\"")
	sstring = gsub(sstring, "\r", "\\r")
	sstring = gsub(sstring, "\n", "\\n")
	sstring = gsub(sstring, "\t", "\\t")
	return sstring
end

function tinsertmany(ttable, ...)
	for i = 1, getn(arg) do
		tinsert(ttable, arg[i])
	end
end

function main()
	DetermChunk()
	NonDetermChunk()
	matchlights()
	parseheader()
	parsedistribution("Distributions", GlobDist)
	-- paths not supported
--	parsepaths()
	-- let's not import these either to be fair
--	parsesobgroups()
	parseplayers()
	parselevelsettings()
end

function writetostdout()
	local inputfile = openfile(arg[1], "r")
	local inputtext = read(inputfile, "*a")
	closefile(inputfile)
	dostring(inputtext)
	main()
	for i = 1, getn(HeadArr) do
		write(HeadArr[i])
	end
	for i = 1, getn(DistArr) do
		if (DistArr[i] == nil) then
			error
			(
				DistArr[i-8] .. "  " ..
				DistArr[i-7] .. "  " ..
				DistArr[i-6] .. "  " ..
				DistArr[i-5] .. "  " ..
				DistArr[i-4] .. "  " ..
				DistArr[i-3] .. "  " ..
				DistArr[i-2] .. "  " ..
				DistArr[i-1] .. "  " ..
				DistArr[i+1]
			)
		end
		write(DistArr[i])
	end
--	for i = 1, getn(SobgArr) do
--		write(SobgArr[i])
--	end
--	for i = 1, getn(PathArr) do
--		write(PathArr[i])
--	end
	for i = 1, getn(PlayArr) do
		write(PlayArr[i])
	end
	for i = 1, getn(LevlArr) do
		write(LevlArr[i])
	end
	write("\n")
end

function writetofile()
	local inputfile = openfile(arg[1], "r")
	local inputtext = read(inputfile, "*a")
	closefile(inputfile)
	dostring(inputtext)
	main()
	local outputfile = openfile(arg[2], "w+")
	for i = 1, getn(HeadArr) do
		write(outputfile, HeadArr[i])
	end
	for i = 1, getn(DistArr) do
		write(outputfile, DistArr[i])
	end
--	for i = 1, getn(SobgArr) do
--		write(outputfile, SobgArr[i])
--	end
--	for i = 1, getn(PathArr) do
--		write(outputfile, PathArr[i])
--	end
	for i = 1, getn(LevlArr) do
		write(outputfile, LevlArr[i])
	end
	write(outputfile, "\n")
	closefile(outputfile)
	print("File written.")
end

function printalert(intext)
	print("alert('" .. intext .. "')")
end

writetostdout()
--writetofile()
