function spiralAdd(tPos, tDst, tPar, tRot)
	local sLay, nRad, nArm, nRot, nAng, nHgh, nWid, nThk, tTim, iMod = tPar[1], tPar[2], tPar[3], tPar[4], tPar[5], tPar[6], tPar[7], tPar[8], tPar[9], tPar[10]
	local tCoo, minTim, maxTim, v, t, s, l, w, h = {}, tTim[1], tTim[2], 360 * nRot, 0, 0, 0, 0, 0
	for i, tTab in tDst do
		local t_X, l_X, w_X, h_X, rotArm = minTim, nWid/-2, nWid/-2, nThk/-2, 0
		local iNum = tTab[1]
		for j = 1, iNum do
			if (iMod == 1) then
				v, t = v, random3(minTim, maxTim)
				s = t
				if (sLay == "Archimedes") then
				--	s = 1 - t
				end
				l, w, h = random3(nWid) - nWid/2, random3(nWid) - nWid/2, random3(nThk) - nThk/2
			elseif (iMod == 2) then
				v, t = v, random3(minTim, maxTim)
				s = t
				if (sLay == "Archimedes") then
				--	s = 1 - t
				end
				l, w, h = random3(0, nWid * s), random3(0, nWid * s), random3(nThk) - nThk/2
			elseif (iMod == 0) then
				v, t = v, t_X
				l, w, h = l_X, w_X, h_X
				t_X = t_X + (maxTim - minTim)/iNum
				l_X, w_X, h_X = l_X + nWid/iNum, w_X + nWid/iNum, h_X + nThk/iNum
			end
			if (sLay == "Nautilus") then
				-- exp(rad(v * t)/tan(nAng)) is the starter value
				tCoo =
				{
					exp(rad(v * t)/tan(nAng)) * cos(v * t) * nRad + l,
					h - nHgh * t + nHgh/2,
					exp(rad(v * t)/tan(nAng)) * sin(v * t) * nRad + w,
				}
			elseif (sLay == "Archimedes") then
				tCoo =
				{
					cos(v * t) * t * nRad + l,
					h + nHgh * t - nHgh/2,
					sin(v * t) * t * nRad + w,
				}
			end
			for h = 1, nArm do
				tCoo = vrotate(tCoo, {0, rotArm, 0,})
				appendShape(tPos, i, tTab, j, tCoo, tRot)
				rotArm = rotArm + (360/nArm)
			end
		end
	end
end
