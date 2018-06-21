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

function branchAdd(tPos, tDst, tPar, tRot, lastRad, countDiv, countFrq, lastPos, nextPos, tiltDeg, spinDeg)
	local thisPos = {}
	local tDiv, tInt, tFrq, tBeg, tEnd, tRad, tLen, tThk, tAng, iMod = tPar[1], tPar[2], tPar[3], tPar[4], tPar[5], tPar[6], tPar[7], tPar[8], tPar[9], tPar[10]
	local minRad, maxRad, minDist, maxDist, minThck, maxThck = tRad[1], tRad[2], tLen[1], tLen[2], tThk[1]/100, tThk[2]/100
	local minAng, maxAng, minBeg, maxBeg, minEnd, maxEnd = tAng[1], tAng[2], tBeg[1], tBeg[2], tEnd[1], tEnd[2]
	local minDiv, maxDiv, minInt, maxInt, minFrq, maxFrq = tDiv[1], tDiv[2], tInt[1], tInt[2], tFrq[1], tFrq[2]
	local numSeg, numInt, numDiv, numBeg, numEnd, numFrq = 0, 0, 0, 0, 0, 0
	if (lastRad == nil) then
		lastRad = maxRad
		countDiv = 1
		countFrq = minFrq
	else
		countFrq = countFrq - 1
	end
	if (lastPos == nil) then
		lastPos = {0,0,0,}
		nextPos = {0,0,0,}
		tiltDeg, spinDeg = 0, 0
	end
	local thisRad = sqrt(lastRad^2/countDiv)
	-- if set to non-random mode
	if (iMod == 0) then
		numInt, numDiv, numBeg, numEnd, numFrq = maxInt, minDiv, maxBeg, maxEnd, maxFrq
	-- if set to random mode, or random mode with decreasing length and radius
	else
		numInt, numDiv, numBeg, numEnd, numFrq = random(minInt, maxInt), random(minDiv, maxDiv), random(minBeg, maxBeg), random(minEnd, maxEnd), random(minFrq, maxFrq)
	end
	if (numBeg > 0) then
		numSeg = numBeg
	elseif (numFrq > 0) then
		numSeg = numInt
	elseif (numEnd > 0) then
		numSeg = numEnd
	end
	for k = 1, numSeg do
		local rad, len, thk, angY, angZ = 0, 0, 0, 0, 0
		-- if set to non-random mode
		if (iMod == 0) then
			local sign1, sign2 = randomSign(), randomSign()
			rad, len, angY, angZ = maxRad, maxDist, sign1 * maxAng, sign2 * maxAng
		-- if set to random mode with decreasing length and radius
		elseif (iMod == 1) or (iMod == 3) then
			local sign1, sign2, narrw = randomSign(), randomSign(), random3(0.9, 1)
			thisRad = thisRad * narrw
			thk, rad, len, angY, angZ = random3(minThck, maxThck) * narrw, thisRad, maxDist - (maxDist - minDist)/(numFrq + 1), random3(minAng, maxAng) * sign1, random3(minAng, maxAng) * sign2
		-- if set to random mode
		elseif (iMod == 2) then
			local sign1, sign2 = randomSign(), randomSign()
			thk, rad, len, angY, angZ = random3(minThck, maxThck), random3(minRad, maxRad), random3(minDist, maxDist), random3(minAng, maxAng) * sign1, random3(minAng, maxAng) * sign2
		end
		tiltDeg, spinDeg = tiltDeg + angZ, spinDeg + angY
		thisPos = nextPos
		nextPos = vaddV(nextPos, vrotate({len, 0, 0,}, {0, spinDeg, tiltDeg,}))
		for i, tTab in tDst do
			local Volume1, Volume2 = PI * maxRad^2 * maxDist, PI * rad^2 * len
			local Density = Volume2/Volume1
			local iNum, gradX = floor(tTab[1] * Density + 0.5), len
			for j = 1, iNum do
				-- if set to non-random mode
				if (iMod == 0) then
					local tCoo = {gradX, 0, 0,}
					tCoo = vaddV(thisPos, vrotate(tCoo, {0, spinDeg, tiltDeg,}))
					appendShape(tPos, i, tTab, j, tCoo, tRot)
				-- if set to random mode with decreasing length and radius
				elseif (iMod == 1) then
					local r = sqrt(random()) * thk * rad + (1 - thk) * rad
					local v, h = random3(360), random3(len)
					local tCoo = {h, r * cos(v), r * sin(v),}
					tCoo = vaddV(thisPos, vrotate(tCoo, {0, spinDeg, tiltDeg,}))
					appendShape(tPos, i, tTab, j, tCoo, tRot)
				-- if set to random mode
				elseif (iMod == 2) then
					local r = sqrt(random()) * thk * rad + (1 - thk) * rad
					local v, h = random3(360), random3(len)
					local tCoo = {h, r * cos(v), r * sin(v),}
					tCoo = vaddV(thisPos, vrotate(tCoo, {0, spinDeg, tiltDeg,}))
					appendShape(tPos, i, tTab, j, tCoo, tRot)
				-- if set to random method using splines with decreasing length and radius
				elseif (iMod == 3) then
					local t = random()
					local A = vmidpoint(lastPos, thisPos)
					local B = thisPos
					local C = vmidpoint(thisPos, nextPos)
					local r = sqrt(random()) * thk * rad + (1 - thk) * rad
					local v = random(360)
					local tCirc =
					{
						r * cos(v),
						r * sin(v),
						0,
					}
					local tCoo =
					{
						(1 - t)^2 * A[1] + 2 * (1 - t) * t * B[1] + t^2 * C[1],
						(1 - t)^2 * A[2] + 2 * (1 - t) * t * B[2] + t^2 * C[2],
						(1 - t)^2 * A[3] + 2 * (1 - t) * t * B[3] + t^2 * C[3],
					}
					local tDerivatives =
					{
						2 * (1 - t) * (B[1] - A[1]) + 2 * t * (C[1] - B[1]),
						2 * (1 - t) * (B[2] - A[2]) + 2 * t * (C[2] - B[2]),
						2 * (1 - t) * (B[3] - A[3]) + 2 * t * (C[3] - B[3]),
					}
					local tNormedPos = vrotate(tCirc, vanglesXY(tDerivatives))
					appendShape(tPos, i, tTab, j, vaddV(tCoo, tNormedPos), tRot)
				end
				gradX = gradX - len/iNum
			end
		end
		lastPos = thisPos
	end
	if (numBeg > 0) then
		tBeg = {0, 0,}
		branchAdd(tPos, tDst, {tDiv, tInt, tFrq, tBeg, tEnd, tRad, tLen, tThk, tAng, iMod,}, tRot, nil, nil, nil, lastPos, nextPos, tiltDeg, spinDeg)
	elseif (numFrq > 0) then
		if (minFrq >= numFrq) then
			minFrq = numFrq - 1
		end
		tFrq = {minFrq, numFrq - 1,}
		for j = 1, numDiv do
			branchAdd(tPos, tDst, {tDiv, tInt, tFrq, tBeg, tEnd, tRad, tLen, tThk, tAng, iMod,}, tRot, thisRad, numDiv, countFrq, lastPos, nextPos, tiltDeg, spinDeg)
		end
	elseif (numEnd > 0) then
		tDiv, tInt, tFrq, tEnd = {0, 0,}, {0, 0,}, {0, 0,}, {0, 0,}
		branchAdd(tPos, tDst, {tDiv, tInt, tFrq, tBeg, tEnd, tRad, tLen, tThk, tAng, iMod,}, tRot, thisRad, numDiv, countFrq, lastPos, nextPos, tiltDeg, spinDeg)
	end
end
