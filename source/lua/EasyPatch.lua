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
