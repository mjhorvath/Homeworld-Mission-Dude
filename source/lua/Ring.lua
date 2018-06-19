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
