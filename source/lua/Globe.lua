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
