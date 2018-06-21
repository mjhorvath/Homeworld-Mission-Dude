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

function easyPatch(tPos, fRUs)
	local tCoo, AstVal = {}, 100
	-- number of asteroids, inner radius, outer radius
	local easyPatchDist = {Asteroid_4 = {1, 0, 0,}, Asteroid_3 = {3, 400, 800,}, Asteroid_2 = {5, 800, 1600,},}
	if (fRUs) then
		AstVal = fRUs
	end
	for k, tTab in easyPatchDist do
		for j = 1, tTab[1] do
			local r, v, u = random3(tTab[2], tTab[3]), random3(180), random3(360)
			tCoo =
			{
				tPos[1] + sqrt(r^2 - (r * cos(v))^2) * cos(u),
				tPos[2] + r * cos(v),
				tPos[3] + sqrt(r^2 - (r * cos(v))^2) * sin(u),
			}
			addAsteroid(k, tCoo, AstVal, 0, 0, 0, 0)
		end
	end
end
