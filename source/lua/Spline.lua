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

function splineAdd(tPos, tDst, tPar, tRot)
	local tCoo, tDerivatives, X, Y, Z = {}, {}, 0, 0, 0
	local tP1A, tP1B, tP2A, tP2B, tRad, tThk = tPar[1], tPar[2], tPar[3], tPar[4], tPar[5], tPar[6]
	local minRad, maxRad, minThk, maxThk = tRad[1], tRad[2], 1 - tThk[1]/100, 1 - tThk[2]/100
	local A1_x, A1_y, A1_z, A2_x, A2_y, A2_z = tP1A[1], tP1A[2], tP1A[3], tP1B[1], tP1B[2], tP1B[3]
	local B1_x, B1_y, B1_z, B2_x, B2_y, B2_z = tP2A[1], tP2A[2], tP2A[3], tP2B[1], tP2B[2], tP2B[3]
	for i, tTab in tDst do
		for j = 1, tTab[1] do
			local t, phi = random(), random(360)
			local r = (minRad + (maxRad - minRad) * t) * random3(minThk, maxThk)
			X, Y, Z = r * cos(phi), r * sin(phi), 0
			tCoo =
			{
				(B1_x + 3 * A2_x - 3 * B2_x - A1_x) * t^3 + (3 * B2_x - 6 * A2_x + 3 * A1_x) * t^2 + (3 * A2_x - 3 * A1_x) * t + A1_x,
				(B1_y + 3 * A2_y - 3 * B2_y - A1_y) * t^3 + (3 * B2_y - 6 * A2_y + 3 * A1_y) * t^2 + (3 * A2_y - 3 * A1_y) * t + A1_y,
				(B1_z + 3 * A2_z - 3 * B2_z - A1_z) * t^3 + (3 * B2_z - 6 * A2_z + 3 * A1_z) * t^2 + (3 * A2_z - 3 * A1_z) * t + A1_z,
			}
			tDerivatives =
			{
				(B1_x + 3 * A2_x - 3 * B2_x - A1_x) * 3 * t^2 + (3 * B2_x - 6 * A2_x + 3 * A1_x) * 2 * t + (3 * A2_x - 3 * A1_x),
				(B1_y + 3 * A2_y - 3 * B2_y - A1_y) * 3 * t^2 + (3 * B2_y - 6 * A2_y + 3 * A1_y) * 2 * t + (3 * A2_y - 3 * A1_y),
				(B1_z + 3 * A2_z - 3 * B2_z - A1_z) * 3 * t^2 + (3 * B2_z - 6 * A2_z + 3 * A1_z) * 2 * t + (3 * A2_z - 3 * A1_z),
			}
			local tRotAng = vanglesXY(tDerivatives)
			local tNormedPos = vrotate({X, Y, Z,}, vmultiply(tRotAng, -1))
			appendShape(tPos, i, tTab, j, vaddV(tCoo, tNormedPos), tRot)
		end
	end
end

function vanglesXY(tVec2)
	local fSgnX, fSgnY, tPrjB1 = 1, 1, vnormalize({tVec2[1], 0, tVec2[3],})
	if (tPrjB1[1] ~= 0) then
		fSgnX = tPrjB1[1]/abs(tPrjB1[1]) * -1
	end
	local fAngY = acos(tPrjB1[3]) * fSgnX
	local tPrjB2 = vnormalize(vrotate(tVec2, {0, fAngY, 0,}))
	if (tPrjB2[2] ~= 0) then
		fSgnY = tPrjB2[2]/abs(tPrjB2[2])
	end
	local fAngX = acos(tPrjB2[3]) * fSgnY
	return {fAngX, fAngY, 0,}
end

function vmultiply(tVec, fVal)
	local tmpVec = {}
	for i, tTab in tVec do
		tmpVec[i] = tTab * fVal
	end
	return tmpVec
end

function vnormalize(tVec)
	return vdivide(tVec, vlength(tVec))
end

function vlength(tVec)
	return sqrt(vsum(vpower(tVec, 2)))
end

function vdivide(tVec, fVal)
	local tmpVec = {}
	for i, tTab in tVec do
		tmpVec[i] = tTab/fVal
	end
	return tmpVec
end

function vpower(tVec, fVal)
	local tmpVec = {}
	for i, tTab in tVec do
		tmpVec[i] = tTab^fVal
	end
	return tmpVec
end

function vsum(tVec1)
	local tmpVal = 0
	for i, tTab in tVec1 do
		tmpVal = tmpVal + tTab
	end
	return tmpVal
end
