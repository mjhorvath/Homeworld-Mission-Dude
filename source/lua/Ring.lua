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

function ringAdd(tPos, tDst, tPar, tRot)
	local fAx1, fAx2, fThk, fHgh, tArc, iMod = tPar[1], tPar[2], tPar[3], tPar[4], tPar[5], tPar[6]
	local tCoo, minArc, maxArc = {}, tArc[1], tArc[2]
	for i, tTab in tDst do
		local u, w, h, arc, iNum = 0, 0, 0, 0, tTab[1]
		for j = 1, iNum do
			if (iMod == 2) then
				u = random3(minArc, maxArc)
				tCoo =
				{
					cos(u) * fAx2 - random3(fThk),
					random3(fHgh) - fHgh/2,
					sin(u) * fAx1 - random3(fThk),
				}
			elseif (iMod == 1) then
				u = random3(minArc, maxArc)
				tCoo =
				{
					cos(u) * (fAx2 - random3(fThk)),
					random3(fHgh) - fHgh/2,
					sin(u) * sqrt((fAx2 - random3(fThk))^2 - fAx2^2 + fAx1^2),
				}
			elseif (iMod == 0) then
				u = minArc + arc
				tCoo =
				{
					cos(u) * (fAx2 + fThk/-2 + w),
					fHgh/-2 + h,
					sin(u) * (fAx1 + fThk/-2 + w),
				}
				arc, w, h = arc + (maxArc - minArc)/iNum, w + fThk/iNum, h + fHgh/iNum
			end
			appendShape(tPos, i, tTab, j, tCoo, tRot)
		end
	end
end
