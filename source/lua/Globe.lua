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

function globeAdd(tPos, tDst, tPar, xNull)
	local lat, lon, u, X, Y = 0, 0, 0, 0, 0
	local fRad, fLat, fLon, fThk, fHgh, tArc, iMod = tPar[1], tPar[2], tPar[3], tPar[4], tPar[5], tPar[6], tPar[7]
	for i = 1, fLat do
		lat, u = lat + 360/(fLat * 2 + 2), lat 
		X, Y = cos(u) * fRad, sin(u) * fRad
		ringAdd(vaddV(tPos, {0, X, 0,}), tDst, {Y, Y, fThk, fHgh, tArc, iMod,}, {0, 0, 0,})
	end
	for i = 1, fLon do
		lon = lon + 360/fLon
		ringAdd(tPos, tDst, {fRad, fRad, fThk, fHgh, tArc, iMod,}, {0, lon, 90,})
	end
end
