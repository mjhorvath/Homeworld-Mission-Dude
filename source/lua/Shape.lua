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

function shapeAdd(tPos, tDst, tPar, tRot)
	local sLay = tPar[1]
	for i, tTab in tDst do
		for j = 1, tTab[1] do
			local tCoo = {}
			if (sLay == "Cuboid") then
				tCoo = makeCuboid(tPar)
			elseif (sLay == "Ellipsoid") then
				tCoo = makeEllipsoid(tPar)
			elseif (sLay == "Cylinder") then
				tCoo = makeCylinder(tPar)
			elseif (sLay == "Cone") then
				tCoo = makeCone(tPar)
			elseif (sLay == "Toroid") then
				tCoo = makeToroid(tPar)
			elseif (sLay == "Helicoid") then
				tCoo = makeHelicoid(tPar)
			elseif (sLay == "Paraboloid") then
				tCoo = makeParaboloid(tPar)
			elseif (sLay == "Hyperboloid") then
				tCoo = makeHyperboloid(tPar)
			elseif (sLay == "Astroid") then
				tCoo = makeAstroid(tPar)
			elseif (sLay == "Funnel") then
				tCoo = makeFunnel(tPar)
			elseif (sLay == "Dini") then
				tCoo = makeDini(tPar)
			elseif (sLay == "Corkscrew") then
				tCoo = makeCorkscrew(tPar)
			elseif (sLay == "Seashell") then
				tCoo = makeSeashell(tPar)
			elseif (sLay == "SineDisc") then
				tCoo = makeSineDisc(tPar)
			elseif (sLay == "SinePlane") then
				tCoo = makeSinePlane(tPar)
			elseif (sLay == "Moebius") then
				tCoo = makeMoebius(tPar)
			elseif (sLay == "Klein") then
				tCoo = makeKlein(tPar)
			elseif (sLay == "Klein8") then
				tCoo = makeKlein8(tPar)
			elseif (sLay == "Kuen") then
				tCoo = makeKuen(tPar)
			elseif (sLay == "Boy") then
				tCoo = makeBoy(tPar)
			elseif (sLay == "Lissajous3D") then
				tCoo = makeLissajous3D(tPar)
			elseif (sLay == "Rectangle") then
				tCoo = makeRectangle(tPar)
			elseif (sLay == "Ellipse") then
				tCoo = makeEllipse(tPar)
			elseif (sLay == "Triangle") then
				-- to do
			elseif (sLay == "Parabola") then
				tCoo = makeParabola(tPar)
			elseif (sLay == "Hyperbola") then
				tCoo = makeHyperbola(tPar)
			elseif (sLay == "Catenary") then
				-- to do
			elseif (sLay == "Hypotrochoid") then
				tCoo = makeHypotrochoid(tPar)
			elseif (sLay == "Epitrochoid") then
				tCoo = makeEpitrochoid(tPar)
			elseif (sLay == "Lissajous2D") then
				tCoo = makeLissajous2D(tPar)
			end
			appendShape(tPos, i, tTab, j, tCoo, tRot)
		end
	end
end

function makeCuboid(tPar)
	local t, p = random(), randomSign()
	local l, w, h, L, W, H = randomSet2(-tPar[2], tPar[2], -tPar[3], tPar[3], -tPar[4], tPar[4], tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], tPar[4] - tPar[5], tPar[4])
	if (t < 1/3) then
		l = L * p
	elseif (t < 2/3) then
		w = W * p
	elseif (t <= 1) then
		h = H * p
	end
	return {l, h, w,}
end

function makeEllipsoid(tPar)
	local L, W, H = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], tPar[4] - tPar[5], tPar[4])
	local u, v = randomSet(180,360)
	return {L * cos(v) * sin(u), H * sin(v) * sin(u), W * cos(u),}
end

function makeCylinder(tPar)
	local L, W, h = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], -tPar[4], tPar[4])
	local u, v = randomSet(180,360)
	return {L * cos(v), h, W * sin(v),}
end

function makeCone(tPar)
	local L, W, h = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], -tPar[4], tPar[4])
	local v = random3(360)
	return {(1 - h/c) * L * cos(v)/2, h, (1 - h/c) * W * sin(v)/2,}
end

function makeToroid(tPar)
	local H, M = randomSet2(tPar[4] - tPar[5], tPar[4], tPar[6] - tPar[5], tPar[6])
	local v, o = randomSet(360,360)
	return {(tPar[2] + M * cos(v)) * cos(o), H * sin(v), (tPar[3] + M * cos(v)) * sin(o),}
end

function makeHelicoid(tPar)
	local L, W = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3])
	local t = random()
	return {L * cos(t * tPar[6] * 360), tPar[4] * (2 * t - 1), W * sin(t * tPar[6] *  360),}
end

function makeParaboloid(tPar)
	local L, W, h = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], -tPar[4], tPar[4])
	local v = random3(360)
	return {L * sqrt(h/1000) * cos(v), h, W * sqrt(h/1000) * sin(v),}
end

function makeHyperboloid(tPar)
	local L, W, H = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], tPar[4] - tPar[5], tPar[4])
	local t, v, p = random(), random3(360), randomSign()
	return {L * sqrt(1 + (t * p)^2) * cos(v), H * (t * p), W * sqrt(1 + (t * p)^2) * sin(v),}
end

function makeAstroid(tPar)
	local L, W, H = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], tPar[4] - tPar[5], tPar[4])
	local v, o = randomSet(360,360)
	return {L * (cos(o) * cos(v))^3, H * (sin(v))^3, W * (sin(o) * cos(v))^3,}
end

function makeFunnel(tPar)
	local L, W, H = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], tPar[4] - tPar[5], tPar[4])
	local t, v = random(), random3(360)
	return {L * t * cos(v), H * log(t)/10, W * t * sin(v),}
end

function makeDini(tPar)
	local L, W, H = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], tPar[4] - tPar[5], tPar[4])
	local v, u = randomSet(360,180)
	return {L * (cos(tPar[6] * v) * sin(u/2)), H * (cos(u/2) + log(tan(u/4)) + rad(tPar[6] * v)/(2 * PI)), W * (sin(tPar[6] * v) * sin(u/2)),}
end

function makeCorkscrew(tPar)
	local L, W, H = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], tPar[4] - tPar[5], tPar[4])
	local v, u = randomSet(360, 180)
	return {L * cos(v) * cos(u), H * rad(v)/(2 * PI), W * sin(v) * cos(u),}
end

function makeSeashell(tPar)
	local t, o = random(), random3(360)
	return
	{
		(tPar[5]/tPar[6] + (1 - t) * (1 + cos(o))) * tPar[2] * cos(tPar[6] * t * 360),
		tPar[4] * t^(1/2) * (2 * tPar[6] - 1) + tPar[3] * sin(o) * (1 - t),
		(tPar[5]/tPar[6] + (1 - t) * (1 + cos(o))) * tPar[2] * sin(tPar[6] * t * 360),
	}
end

function makeSineDisc(tPar)
	local L, W, H = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], tPar[4] - tPar[5], tPar[4])
	local t, v = random(), random3(360)
	return {L * t * cos(v), H * sin(t * 360 * tPar[6]), W * t * sin(v),}
end

function makeSinePlane(tPar)
	local s, t = random(), random()
	return
	{
		tPar[2] * s * 2 - tPar[2],
		tPar[4] * (sin(s * 360 * tPar[6]) + sin(t * 360 * tPar[6]))/2,
		tPar[3] * t * 2 - tPar[3],
	}
end

function makeMoebius(tPar)
	local L, W, h = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], -tPar[4], tPar[4])
	local v = random3(360)
	return {L * cos(v) + h * cos(v/2) * cos(v), h * sin(v/2), W * sin(v) + h * cos(v/2) * sin(v),}
end

function makeLissajous3D(tPar)
	local v, o, u = randomSet(360,360,180)
	return
	{
		tPar[2] * sin(v * tPar[6])		+ tPar[3] * sin(u) * cos(o),
		tPar[2] * sin(v * tPar[6] * tPar[4])	+ tPar[3] * sin(u) * sin(o),
		tPar[2] * sin(v * tPar[6] * tPar[5])	+ tPar[3] * cos(u),
	}
end

function makeKlein(tPar)
	local u, v = randomSet(360,180)
	return
	{
		cos(u) * (cos(u/2) * (sqrt(2) + cos(v)) + sin(u/2) * sin(v) * cos(v))	* tPar[2],
		(-sin(u/2) * (sqrt(2) + cos(v)) + cos(u/2) * sin(v) * cos(v))		* tPar[4],
		sin(u) * (cos(u/2) * (sqrt(2) + cos(v)) + sin(u/2) * sin(v) * cos(v))	* tPar[3],
	}
end

function makeKlein8(tPar)
	local u, v = randomSet(360,360)
	return
	{
		(e + cos(u/2) * sin(v) - sin(u/2) * sin(v*2)) * cos(u)	* tPar[2],
		(sin(u/2) * sin(v) + cos(u/2) * sin(v*2))		* tPar[3],
		(e + cos(u/2) * sin(v) - sin(u/2) * sin(v*2)) * sin(u)	* tPar[4],
	}
end

function makeKuen(tPar)
	local u, v = randomSet(180,360)
	return
	{
		2 * (cos(v) + rad(v) * sin(v)) * sin(u)/(1 + rad(v)^2 * sin(u)^2)	* tPar[2],
		(log(tan(u/2)) + 2 * cos(u)/(1 + rad(v)^2 * sin(u)^2))		* tPar[3],
		2 * (sin(v) - rad(v) * cos(v)) * sin(u)/(1 + rad(v)^2 * sin(u)^2)	* tPar[4],
	}
end

function makeBoy(tPar)
	local u, v = randomSet(360,180)
	return
	{
		2/3 * (cos(u) * cos(2 * v) + sqrt(2) * sin(u) * cos(v)) * cos(u)/(sqrt(2) - sin(2 * u) * sin(3 * v))	* tPar[2],
		sqrt(2) * cos(u)^2/(sqrt(2) - sin(2 * u) * sin(2 * v))							* tPar[3],
		2/3 * (cos(u) * sin(2 * v) - sqrt(2) * sin(u) * sin(v)) * cos(u)/(sqrt(2) - sin(2 * u) * sin(3 * v))	* tPar[4],
	}
end

function makeRectangle(tPar)
	local L, W, l = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], -tPar[2], tPar[2])
	local w, h = randomSet2(-tPar[3], tPar[3], -tPar[4], tPar[4])
	local p, t = randomSign(), random()
	if (t < 1/2) then
		l = L * p
	else
		w = W * p
	end
	return {l, h, w,}
end

function makeEllipse(tPar)
	local L, W, h, v = randomSet2(tPar[2] - tPar[5], tPar[2], tPar[3] - tPar[5], tPar[3], -tPar[4], tPar[4])
	local v = random3(360)
	return {L * cos(v), h, W * sin(v),}
end

function makeParabola(tPar)
	local w, h, p = randomSet2(-tPar[3], tPar[3], -tPar[4], tPar[4])
	local p = randomSign()
	return
	{
		sqrt(4 * w * tPar[2]) * p + random3(-tPar[5]/2, tPar[5]/2),
		h,
		w + random3(-tPar[5]/2, tPar[5]/2),
	}
end

function makeHyperbola(tPar)
	local h, v = random3(-tPar[4], tPar[4]), random3(360)
	return
	{
		tPar[2]/cos(v) + random3(-tPar[5]/2, tPar[5]/2),
		h,
		tPar[3] * tan(v) + random3(-tPar[5]/2, tPar[5]/2),
	}
end

function makeHypotrochoid(tPar)
	local v, o, u = randomSet(360,360,180)
	return
	{
		(tPar[2] - tPar[3]) * cos(v * tPar[6]) + tPar[5] * cos((tPar[2] - tPar[3])/tPar[3] * v * tPar[6])	+ tPar[4] * sin(u) * cos(o),
		0													+ tPar[4] * sin(u) * sin(o),
		(tPar[2] - tPar[3]) * sin(v * tPar[6]) - tPar[5] * sin((tPar[2] - tPar[3])/tPar[3] * v * tPar[6])	+ tPar[4] * cos(u),
	}
end

function makeEpitrochoid(tPar)
	local v, o, u = randomSet(360,360,180)
	return
	{
		(tPar[2] + tPar[3]) * cos(v * tPar[6]) - tPar[5] * cos((tPar[2] + tPar[3])/tPar[3] * v * tPar[6])	+ tPar[4] * sin(u) * cos(o),
		0													+ tPar[4] * sin(u) * sin(o),
		(tPar[2] + tPar[3]) * sin(v * tPar[6]) - tPar[5] * sin((tPar[2] + tPar[3])/tPar[3] * v * tPar[6])	+ tPar[4] * cos(u),
	}
end

function makeLissajous2D(tPar)
	local v, o, u = randomSet(360,360,180)
	return
	{
		tPar[2] * sin(v * tPar[6] + tPar[3])	+ tPar[4] * sin(u) * cos(o),
		0					+ tPar[4] * sin(u) * sin(o),
		tPar[2] * sin(v * tPar[6] * tPar[5])	+ tPar[4] * cos(u),
	}
end

function randomSet2(...)
	local v = {}
	for i = 2, getn(arg), 2 do
		v[i/2] = random3(arg[i-1], arg[i])
	end
	if arg[10] then
		return v[1], v[2], v[3], v[4], v[5]
	elseif arg[8] then
		return v[1], v[2], v[3], v[4]
	elseif arg[6] then
		return v[1], v[2], v[3]
	elseif arg[4] then
		return v[1], v[2]
	else
		return v[1]
	end
end

function randomSet(...)
	local v = {}
	for i = 1, getn(arg) do
		v[i] = random3(arg[i-1])
	end
	if arg[5] then
		return v[1], v[2], v[3], v[4], v[5]
	elseif arg[4] then
		return v[1], v[2], v[3], v[4]
	elseif arg[3] then
		return v[1], v[2], v[3]
	elseif arg[2] then
		return v[1], v[2]
	else
		return v[1]
	end
end
