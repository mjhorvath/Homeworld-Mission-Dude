// Copyright (C) 2018  Michael Horvath
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

var defaultobject = {Type:['Point'],Subtype:[''],Translation:[0,0,0],Rotation:[0,0,0],Label:[''],Amount:[1],Name:['']}
var nullobject = {Type:[''],Subtype:[''],Translation:[0,0,0],Rotation:[0,0,0],Label:[''],Amount:[0]}

var basicpropertytable =
{
	Asteroid:	{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[null],	Amount:[3]},
	Camera:		{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[2],	Amount:[3]},
	Cloud:		{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[2],	Amount:[3]},
	DustCloud:	{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[2],	Amount:[3]},
	Nebula:		{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[2],	Amount:[3]},
	Point:		{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],		Label:[2],	Name:[2],	Amount:[3]},
	Pebble:		{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[null],	Amount:[3]},
	Salvage:	{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[null],	Amount:[3]},
	Sphere:		{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[2],	Amount:[3]},
	Squadron:	{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[1,1,1],		Label:[2],	Name:[2],	Amount:[3]},
//	Missile:	{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[1,1,1],		Label:[2],	Name:[null],	Amount:[3]},
	DirLight:	{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[2],	Amount:[3]},
//	AmbientLight:	{Type:[2],	Subtype:[null],	Translation:[null,null,null],	Rotation:[null,null,null],	Label:[2],	Name:[],	Amount:[3]},
	RvSquadron:	{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[null],	Amount:[3]},
	RvResource:	{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[null,null,null],	Label:[2],	Name:[null],	Amount:[3]},
//	AbientSound:	{},
//	Coordinate:	{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	Branch:		{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	Spline:		{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	Ring:		{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	Globe:		{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	Shape:		{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	Spiral:		{Type:[2],	Subtype:[2],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	Literal:	{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	EasyPatch:	{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]},
	StartPoint:	{Type:[2],	Subtype:[null],	Translation:[1,1,1],	Rotation:[1,1,1],	Label:[2],	Name:[null],	Amount:[3]}
}

var morepropertytable =
{
	Asteroid:	{RUValue:[1],Unknown1:[1],Unknown2:[1],Unknown3:[1],Unknown4:[1]},
	Camera:		{Target:[1,1,1]},
	Cloud:		{Color:[1,1,1,1],Unknown1:[1],Radius:[1]},
	DustCloud:	{Color:[1,1,1,1],Unknown1:[1],Radius:[1]},
	Nebula:		{Color:[1,1,1,1],Unknown1:[1],Radius:[1]},
	Point:		{},
	Pebble:		{Unknown1:[1],Unknown2:[1],Unknown3:[1]},
	Salvage:	{RUValue:[1],Unknown1:[1],Unknown2:[1],Unknown3:[1],Unknown4:[1]},
	Sphere:		{Radius:[1]},
	Squadron:	{Player:[3],Unknown1:[1],Hyperspace:[3]},
//	Missile:	{},
	DirLight:	{Color:[1,1,1],Specular:[1,1,1]},
//	AmbientLight:	{Diffuse:[1,1,1]},
	RvSquadron:	{Player:[3],Unknown1:[1],Unknown2:[1],Unknown3:[1],Unknown4:[1]},
	RvResource:	{Unknown1:[1],Unknown2:[1],Unknown3:[1]},
//	AmbientSound:	{},
//	Coordinate:	{},
	Branch:		{Distribution:[4],Divisions:[3,3],Intervals:[3,3],Frequency:[3,3],Beginning:[3,3],Ending:[3,3],Radii:[1,1],Lengths:[1,1],Thicknesses:[1,1],Angles:[1,1],Mode:[3]},
	Spline:		{Distribution:[4],Point1A:[1,1,1],Point1B:[1,1,1],Point2A:[1,1,1],Point2B:[1,1,1],Radii:[1,1],Thicknesses:[1,1]},
	Ring:		{Distribution:[4],Axis1:[1],Axis2:[1],Thickness:[1],Height:[1],Arc:[1,1],Mode:[3]},
	Globe:		{Distribution:[4],Radius:[1],Latitude:[3],Longitude:[3],Thickness:[1],Height:[1],Arc:[1,1],Mode:[3]},
	Shape:		{Distribution:[4],ParamA:[1],ParamB:[1],ParamC:[1],ParamD:[1],ParamE:[1]},
	Spiral:		{Distribution:[4],Radius:[1],Arms:[3],Revolutions:[1],Angle:[1],Height:[1],Width:[1],Thickness:[1],TValues:[1,1],Mode:[3]},
	Literal:	{Distribution:[4]},
	EasyPatch:	{RUValue:[1]},
	StartPoint:	{}
}

var morepropertyhelptable =
{
	Asteroid:	{RUValue:['Float: the percentage of the maximum RU value.'],Unknown1:['Number: unknown.'],Unknown2:['Number: unknown.'],Unknown3:['Number: unknown.'],Unknown4:['Number: unknown.']},
	Camera:		{Target:['Float: the x-coordinate of the target.','Float: the y-coordinate of the target.','Float: the z-coordinate of the target.']},
	Cloud:		{Color:['Float: between 0 and 1. The RED component.','Float: between 0 and 1. The GREEN component.','Float: between 0 and 1. The BLUE component.','Float: between 0 and 1. The ALPHA component.'],Unknown1:['Number: unknown.'],Radius:['Float: the radius of the cloud.']},
	DustCloud:	{Color:['Float: between 0 and 1. The RED component.','Float: between 0 and 1. The GREEN component.','Float: between 0 and 1. The BLUE component.','Float: between 0 and 1. The ALPHA component.'],Unknown1:['Number: unknown.'],Radius:['Float: the radius of the cloud.']},
	Nebula:		{Color:['Float: between 0 and 1. The RED component.','Float: between 0 and 1. The GREEN component.','Float: between 0 and 1. The BLUE component.','Float: between 0 and 1. The ALPHA component.'],Unknown1:['Number: unknown.'],Radius:['Float: the radius of the cloud.']},
	Point:		{},
	Pebble:		{Unknown1:['Number: unknown.'],Unknown2:['Number: unknown.'],Unknown3:['Number: unknown.']},
	Salvage:	{RUValue:['Float: the percentage of the maximum RU value.'],Unknown1:['Number: unknown.'],Unknown2:['Number: unknown.'],Unknown3:['Number: unknown.'],Unknown4:['Number: unknown.']},
	Sphere:		{Radius:['Float: the radius of the sphere.']},
	Squadron:	{Player:['Integer: the index number of the owner player. (between 0 and 5, or -1 for inert ships)'],Unknown1:['Number: unknown.'],Hyperspace:['Boolean: spawn the ship in hyperspace.']},
//	Missile:	{},
	DirLight:	{Color:['Float: between 0 and 1. The RED component.','Float: between 0 and 1. The GREEN component.','Float: between 0 and 1. The BLUE component.'],Specular:['Float: between 0 and 1. The RED component.','Float: between 0 and 1. The GREEN component.','Float: between 0 and 1. The BLUE component.']},
//	AmbientLight:	{Diffuse:['Float: between 0 and 1. The RED component.','Float: between 0 and 1. The GREEN component.','Float: between 0 and 1. The BLUE component.']}
	RvSquadron:	{Player:['Integer: the index number of the owner player. (between 0 and 5, or -1 for inert ships)'],Unknown1:['Number: unknown.'],Unknown2:['Number: unknown.'],Unknown3:['Number: unknown.'],Unknown4:['Number: unknown.']},
	RvResource:	{Unknown1:['Number: unknown.'],Unknown2:['Number: unknown.'],Unknown3:['Number: unknown.']},
//	AmbientSound:	{},
//	Coordinate:	{},
	Branch:		{Distribution:['String: the distribution table used to populate the shape.'],Divisions:['Integer: minimum number of new shoots.','Integer: maximum number of new shoots.'],Intervals:['Integer: minimum number of segments between divisions.','Integer: maximum number of segments between divisions.'],Frequency:['Integer: minimum number of times the tree divides.','Integer: maximum number of times the tree divides.'],Beginning:['Integer: minimum number of segments added to the beginning.','Integer: maximum number of segments added to the beginning.'],Ending:['Integer: minimum number of segments added to the end.','Integer: maximum number of segments added to the end.'],Radii:['Float: minimum radius of a segment.','Float: maximum radius of a segment.'],Lengths:['Float: minimum length of a segment.','Float: maximum length of a segment.'],Thicknesses:['Float: minimum thickness as percentages of the radius.','Float: maximum thickness as percentages of the radius.'],Angles:['Float: minimum angle of deviation between segments.','Float: maximum angle of deviation between segments.'],Mode:['Integer: 0, 1, 2 or 3. See "Help".']},
	Spline:		{Distribution:['String: the distribution table used to populate the shape.'],Point1A:['Float: x-coordinate of the starting point.','Float: y-coordinate of the starting point.','Float: z-coordinate of the starting point.'],Point1B:['Float: x-coordinate of the first control point.','Float: y-coordinate of the first control point.','Float: z-coordinate of the first control point.'],Point2A:['Float: x-coordinate of the ending point.','Float: y-coordinate of the ending point.','Float: z-coordinate of the ending point.'],Point2B:['Float: x-coordinate of the second control point.','Float: y-coordinate of the second control point.','Float: z-coordinate of the second control point.'],Radii:['Float: initial radius of the tube.','Float: final radius of the tube.'],Thicknesses:['Float: minimum thickness as percentage of the radius.','Float: maximum thickness as percentage of the radius.']},
	Ring:		{Distribution:['String: the distribution table used to populate the shape.'],Axis1:['Float: the length of axis 1.'],Axis2:['Float: the length of axis 2.'],Thickness:['Float: the distance from the outer radius to the inner radius.'],Height:['Float: the height of the ring relative to the plane.'],Arc:['Float: beginning of the arc. (degrees)','Float: ending of the arc. (degrees)'],Mode:['Integer: 0, 1 or 2. See "Help".']},
	Globe:		{Distribution:['String: the distribution table used to populate the shape.'],Radius:['Float: the radius of the sphere.'],Latitude:['Integer: the number of latitudinal rings.'],Longitude:['Integer: the number of longitudinal rings.'],Thickness:['Float: the distance from the outer radius to the inner radius.'],Height:['Float: the height of the ring relative to the plane.'],Arc:['Float: beginning of the arc. (degrees)','Float: ending of the arc. (degrees)'],Mode:['Integer: 0, 1 or 2. See "Help".']},
	Shape:		{Distribution:['String: the distribution table used to populate the shape.'],ParamA:['See "Help".'],ParamB:['See "Help".'],ParamC:['See "Help".'],ParamD:['See "Help".'],ParamE:['See "Help".']},
	Spiral:		{Distribution:['String: the distribution table used to populate the shape.'],Radius:['Float: minimum or maximum radius of the spiral.'],Arms:['Integer: the number of arms the spiral will have.'],Revolutions:['Float: the number of times the spiral will rotate around the origin.'],Angle:['Float: the angle of deviation. (degrees)'],Height:['Float: the height of the spiral above the plane.'],Width:['Float: the width of the spiral arms.'],Thickness:['Float: the thickness of the spiral arms.'],TValues:['Float: minimum value for "t" at which the curve is sampled. (between 0 and 1)','Float: maximum value for "t" at which the curve is sampled. (between 0 and 1)'],Mode:['Integer: 0, 1 or 2. See "Help".']},
	Literal:	{Distribution:['String: the distribution table used to populate the shape.']},
	EasyPatch:	{RUValue:['Float: the percentage of the maximum RU value.']},
	StartPoint:	{}
}

var defaultmorepropertytable =
{
	Asteroid:	{RUValue:[100],Unknown1:[0],Unknown2:[0],Unknown3:[0],Unknown4:[0]},
	Camera:		{Target:[0,0,0]},
	Cloud:		{Color:[1,1,1,1],Unknown1:[0],Radius:[1000]},
	DustCloud:	{Color:[1,1,1,1],Unknown1:[0],Radius:[1000]},
	Nebula:		{Color:[1,1,1,1],Unknown1:[0],Radius:[1000]},
	Point:		{},
	Pebble:		{Unknown1:[0],Unknown2:[0],Unknown3:[0]},
	Salvage:	{RUValue:[100],Unknown1:[0],Unknown2:[0],Unknown3:[0],Unknown4:[0]},
	Sphere:		{Radius:[1000]},
	Squadron:	{Player:[0],Unknown1:[0],Hyperspace:[0]},
//	Missile:	{},
	DirLight:	{Color:[1,1,1],Specular:[1,1,1]},
//	AmbientLight:	{Diffuse:[1,1,1]},
	RvSquadron:	{Player:[0],Unknown1:[0],Unknown2:[0],Unknown3:[0],Unknown4:[0]},
	RvResource:	{Unknown1:[0],Unknown2:[0],Unknown3:[0]},
//	AmbientSound:	{},
//	Coordinate:	{},
	Branch:		{Distribution:[null/*intentionally blank*/],Divisions:[2,2],Intervals:[2,2],Frequency:[6,6],Beginning:[2,2],Ending:[2,2],Radii:[100,1000],Lengths:[1000,5000],Thicknesses:[10,100],Angles:[0,30],Mode:[2]},
	Spline:		{Distribution:[null/*intentionally blank*/],Point1A:[-5000,0,0],Point1B:[-5000,0,5000],Point2A:[5000,0,0],Point2B:[5000,0,-5000],Radii:[1000,1000],Thicknesses:[100,100]},
	Ring:		{Distribution:[null/*intentionally blank*/],Axis1:[20000],Axis2:[50000],Thickness:[10000],Height:[100],Arc:[0,360],Mode:[1]},
	Globe:		{Distribution:[null/*intentionally blank*/],Radius:[20000],Latitude:[6],Longitude:[6],Thickness:[100],Height:[100],Arc:[0,360],Mode:[2]},
	Shape:		{Distribution:[null/*intentionally blank*/],ParamA:[1000],ParamB:[1000],ParamC:[20000],ParamD:[100],ParamE:[0]},
	Spiral:		{Distribution:[null/*intentionally blank*/],Radius:[20000],Arms:[4],Revolutions:[2],Angle:[15],Height:[100],Width:[1000],Thickness:[100],TValues:[0,1],Mode:[1]},
	Literal:	{Distribution:[null/*intentionally blank*/]},
	EasyPatch:	{RUValue:[100]},
	StartPoint:	{}
}

var subtypetable =
{
	Asteroid:	['Asteroid_1','Asteroid_2','Asteroid_3','Asteroid_4','Asteroid_5'],
	Camera:		[],
	Cloud:		['Cloud_0','Cloud_NoRes','Cloud_NoRes2','Cloud_NoRes3'],
	DustCloud:	['DustCloud_0','DustCloud_NoRes','DustCloud_NoRes_M05','DustCloud_NoRes2','DustCloud_NoRes2_M05','DustCloud_NoRes3','DustCloud_NoRes3_M05','DustCloud_NoRes_NoCharge','DustCloud_Teal'],
	Nebula:		['M05_DustCloud_Nebula','M05_NebualDustCloud_NoRes','M05_NebualDustCloud_NoRes2','M05_NebualDustCloud_NoRes3','M07_Foundry_Radiation','M08_NoDamage_Radiation','M11_Bentusi_Debris','M11_Bentusi_Radiation','MP_Bentusi_Radiation','Nebula01_Cream','Nebula01_Teal','Nebula_0','Nebula_Hiding','Radiation'],
	Point:		[],
	Pebble:		['Pebble_0','Pebble_1','Pebble_2'],
	Salvage:	['Slv_Chunk_Lrg01','Slv_Chunk_Lrg02','Slv_Chunk_Lrg03','Slv_Chunk_Lrg04','Slv_Chunk_Lrg05'],
	Sphere:		[],
	Squadron:	['vgr_weaponplatform_missile','vgr_weaponplatform_gun','vgr_transportfrigate','vgr_shipyard','vgr_scout','vgr_resourcecontroller','vgr_resourcecollector','vgr_probe_prox','vgr_probe_ecm','vgr_probe','vgr_prisonstation','vgr_planetkillermissile','vgr_planetkiller','vgr_mothership_makaan','vgr_mothership','vgr_missilecorvette','vgr_minelayercorvette','vgr_listeningpost','vgr_lasercorvette','vgr_lancefighter','vgr_interceptor','vgr_infiltratorfrigate','vgr_hyperspace_platform','vgr_heavymissilefrigate','vgr_destroyer','vgr_commstation','vgr_commandcorvette','vgr_carrier','vgr_bomber','vgr_battlecruiser','vgr_assaultfrigate','vgr_artillerycruiser','sp_tanker6','sp_tanker5','sp_tanker4','sp_tanker3','sp_tanker2','sp_tanker','neu_transport','neu_soundtest','kpr_sajuuk_nosensors','kpr_sajuuk','kpr_mover_salvage','kpr_mover_capture','kpr_mover','kpr_destroyerm10','kpr_destroyer','kpr_attackdroid','hgn_torpedofrigate','hgn_targetdrone','hgn_supportfrigate','hgn_shipyard_spg','hgn_shipyard_elohim','hgn_shipyard','hgn_scout','hgn_resourcecontroller','hgn_resourcecollector','hgn_pulsarplatform','hgn_pulsarcorvette','hgn_proximitysensor','hgn_probe','hgn_mothership','hgn_minelayercorvette','hgn_marinefrigate_soban','hgn_marinefrigate','hgn_ionturret','hgn_ioncannonfrigate','hgn_interceptor','hgn_hscore','hgn_gunturret','hgn_gunplatform','hgn_ecmprobe','hgn_drone_frigate_3','hgn_drone_frigate_2','hgn_drone_frigate','hgn_dreadnaught','hgn_destroyer','hgn_defensefieldfrigate','hgn_cloudexplode','hgn_cloakingfrigate','hgn_carrier','hgn_battlecruiserionbeamturret','hgn_battlecruiser','hgn_attackbomberelite','hgn_attackbomber','hgn_assaultfrigate','hgn_assaultcorvetteelite','hgn_assaultcorvette','meg_veildebris_flake9','meg_veildebris_flake8','meg_veildebris_flake7','meg_veildebris_flake6','meg_veildebris_flake5','meg_veildebris_flake4','meg_veildebris_flake3','meg_veildebris_flake2','meg_veildebris_flake10','meg_veildebris_flake1','meg_veildebris_chunk5_nd','meg_veildebris_chunk5','meg_veildebris_chunk4_nd','meg_veildebris_chunk4','meg_veildebris_chunk3_nd','meg_veildebris_chunk3','meg_veildebris_chunk2_nd','meg_veildebris_chunk2','meg_veildebris_chunk1_nd','meg_veildebris_chunk1','meg_veildebris_chunk_lighthouse','meg_veildebris_bit9','meg_veildebris_bit8','meg_veildebris_bit7','meg_veildebris_bit6','meg_veildebris_bit5','meg_veildebris_bit4','meg_veildebris_bit3','meg_veildebris_bit2','meg_veildebris_bit15','meg_veildebris_bit14','meg_veildebris_bit13','meg_veildebris_bit12','meg_veildebris_bit11','meg_veildebris_bit10','meg_veildebris_bit1','meg_tanisstructure_medium2','meg_tanisstructure_medium','meg_tanis','meg_salvagecollector','meg_sajhulkturret','meg_sajhulkpanels_ui','meg_sajhulkpanels','meg_sajhulknose_ui','meg_sajhulknose','meg_progenitorpowertrigger_noui','meg_progenitorpowertrigger','meg_progenitorpowermodule','meg_misslefrigate','meg_gehenna_7','meg_gehenna_6','meg_gehenna_5','meg_gehenna_4','meg_gehenna_3','meg_gehenna_2','meg_gehenna_1','meg_foundrydebris_flake4','meg_foundrydebris_flake3','meg_foundrydebris_flake2','meg_foundrydebris_flake1','meg_foundrydebris_chunk4','meg_foundrydebris_chunk3','meg_foundrydebris_chunk2','meg_foundrydebris_chunk1','meg_foundry','meg_dreadnaughtberth','meg_chimera','meg_bigred','meg_bentus_ruins_core_3','meg_bentus_ruins_core_2','meg_bentus_ruins_core_1','meg_bentus_ruined','meg_bentus_ruin_9','meg_bentus_ruin_8','meg_bentus_ruin_7','meg_bentus_ruin_6','meg_bentus_ruin_5','meg_bentus_ruin_4','meg_bentus_ruin_3','meg_bentus_ruin_2','meg_bentus_ruin_11','meg_bentus_ruin_10','meg_bentus_ruin_1','meg_bentus','meg_balcoragate','meg_asteroidmp','meg_asteroid_nosubs','meg_asteroid'],
//	Missile:	[],
	DirLight:	[],
//	AmbientLight:	[],
	RvSquadron:	['vgr_weaponplatform_missile','vgr_weaponplatform_gun','vgr_transportfrigate','vgr_shipyard','vgr_scout','vgr_resourcecontroller','vgr_resourcecollector','vgr_probe_prox','vgr_probe_ecm','vgr_probe','vgr_prisonstation','vgr_planetkillermissile','vgr_planetkiller','vgr_mothership_makaan','vgr_mothership','vgr_missilecorvette','vgr_minelayercorvette','vgr_listeningpost','vgr_lasercorvette','vgr_lancefighter','vgr_interceptor','vgr_infiltratorfrigate','vgr_hyperspace_platform','vgr_heavymissilefrigate','vgr_destroyer','vgr_commstation','vgr_commandcorvette','vgr_carrier','vgr_bomber','vgr_battlecruiser','vgr_assaultfrigate','vgr_artillerycruiser','sp_tanker6','sp_tanker5','sp_tanker4','sp_tanker3','sp_tanker2','sp_tanker','neu_transport','neu_soundtest','meg_veildebris_flake9','meg_veildebris_flake8','meg_veildebris_flake7','meg_veildebris_flake6','meg_veildebris_flake5','meg_veildebris_flake4','meg_veildebris_flake3','meg_veildebris_flake2','meg_veildebris_flake10','meg_veildebris_flake1','meg_veildebris_chunk5_nd','meg_veildebris_chunk5','meg_veildebris_chunk4_nd','meg_veildebris_chunk4','meg_veildebris_chunk3_nd','meg_veildebris_chunk3','meg_veildebris_chunk2_nd','meg_veildebris_chunk2','meg_veildebris_chunk1_nd','meg_veildebris_chunk1','meg_veildebris_chunk_lighthouse','meg_veildebris_bit9','meg_veildebris_bit8','meg_veildebris_bit7','meg_veildebris_bit6','meg_veildebris_bit5','meg_veildebris_bit4','meg_veildebris_bit3','meg_veildebris_bit2','meg_veildebris_bit15','meg_veildebris_bit14','meg_veildebris_bit13','meg_veildebris_bit12','meg_veildebris_bit11','meg_veildebris_bit10','meg_veildebris_bit1','meg_tanisstructure_medium2','meg_tanisstructure_medium','meg_tanis','meg_salvagecollector','meg_sajhulkturret','meg_sajhulkpanels_ui','meg_sajhulkpanels','meg_sajhulknose_ui','meg_sajhulknose','meg_progenitorpowertrigger_noui','meg_progenitorpowertrigger','meg_progenitorpowermodule','meg_misslefrigate','meg_gehenna_7','meg_gehenna_6','meg_gehenna_5','meg_gehenna_4','meg_gehenna_3','meg_gehenna_2','meg_gehenna_1','meg_foundrydebris_flake4','meg_foundrydebris_flake3','meg_foundrydebris_flake2','meg_foundrydebris_flake1','meg_foundrydebris_chunk4','meg_foundrydebris_chunk3','meg_foundrydebris_chunk2','meg_foundrydebris_chunk1','meg_foundry','meg_dreadnaughtberth','meg_chimera','meg_bigred','meg_bentus_ruins_core_3','meg_bentus_ruins_core_2','meg_bentus_ruins_core_1','meg_bentus_ruined','meg_bentus_ruin_9','meg_bentus_ruin_8','meg_bentus_ruin_7','meg_bentus_ruin_6','meg_bentus_ruin_5','meg_bentus_ruin_4','meg_bentus_ruin_3','meg_bentus_ruin_2','meg_bentus_ruin_11','meg_bentus_ruin_10','meg_bentus_ruin_1','meg_bentus','meg_balcoragate','meg_asteroidmp','meg_asteroid_nosubs','meg_asteroid','kpr_sajuuk_nosensors','kpr_sajuuk','kpr_mover_salvage','kpr_mover_capture','kpr_mover','kpr_destroyerm10','kpr_destroyer','kpr_attackdroid','hgn_torpedofrigate','hgn_targetdrone','hgn_supportfrigate','hgn_shipyard_spg','hgn_shipyard_elohim','hgn_shipyard','hgn_scout','hgn_resourcecontroller','hgn_resourcecollector','hgn_pulsarplatform','hgn_pulsarcorvette','hgn_proximitysensor','hgn_probe','hgn_mothership','hgn_minelayercorvette','hgn_marinefrigate_soban','hgn_marinefrigate','hgn_ionturret','hgn_ioncannonfrigate','hgn_interceptor','hgn_hscore','hgn_gunturret','hgn_gunplatform','hgn_ecmprobe','hgn_drone_frigate_3','hgn_drone_frigate_2','hgn_drone_frigate','hgn_dreadnaught','hgn_destroyer','hgn_defensefieldfrigate','hgn_cloudexplode','hgn_cloakingfrigate','hgn_carrier','hgn_battlecruiserionbeamturret','hgn_battlecruiser','hgn_attackbomberelite','hgn_attackbomber','hgn_assaultfrigate','hgn_assaultcorvetteelite','hgn_assaultcorvette'],
	RvResource:	['Asteroid_1','Asteroid_2','Asteroid_3','Asteroid_4','Asteroid_5'],
//	AmbientSound:	[],
//	Coordinate:	[],
	Branch:		[],
	Spline:		[],
	Ring:		[],
	Globe:		[],
	Shape:		['Cylinder','Cone','Ellipsoid','Cuboid','Toroid','Helicoid','Paraboloid','Hyperboloid','Astroid','Funnel','Dini','Corkscrew','Seashell','SineDisc','SinePlane','Moebius','Klein','Klein8','Boy','Rectangle','Ellipse','Parabola','Hyperbola','Lissajous3D','Lissajous2D','Hypotrochoid','Epitrochoid'],
	Spiral:		['Nautilus','Archimedes'],
	Literal:	[],
	EasyPatch:	[],
	StartPoint:	[]
}

var mapobjecttable =
{
	Asteroid:	'Asteroid',
	Camera:		'Camera',
	Cloud:		'Cloud',
	DustCloud:	'DustCloud',
	Nebula:		'Nebula',
	Point:		'Point',
	Pebble:		'Pebble',
	Salvage:	'Salvage',
	Sphere:		'Sphere',
	Squadron:	'Squadron',
//	Missile:	'Missile',
	DirLight:	'DirLight',
//	AmbientLight:	'AmbientLight',
	RvSquadron:	'RvSquadron',
	RvResource:	'RvResource',
//	AmbientSound:	'AmbientSound',
//	Coordinate:	'Coordinate',
	Branch:		'Function',
	Spline:		'Function',
	Ring:		'Function',
	Globe:		'Function',
	Shape:		'Function',
	Spiral:		'Function',
	Literal:	'Function',
	EasyPatch:	'Function',
	StartPoint:	'StartPoint'
}

var playertable = {RaceID:[1],StartingRUs:[1],StartPos:[1]}
var playerhelptable = {RaceID:['Integer: the player\'s race ID. (1 = Hiigaran, 2 = Vaygr; ignored in multiplayer)'],StartingRUs:['Integer: the player\'s starting RUs.'],StartPos:['Boolean: does this player require a starting position?']}
var defaultplayer = {RaceID:[1],StartingRUs:[3000],StartPos:[1]}

var levelsettingstable =
{
	setWorldBoundsInner:	{Position:[1,1,1],Size:[1,1,1]},
	setWorldBoundsOuter:	{Position:[1,1,1],Size:[1,1,1]},
	fogAddInterpolator:	{Buffer:[2],Length:[1],Target:[1]},
	fogSetActive:		{Enable:[3]},
	fogSetColour:		{R:[1],G:[1],B:[1],A:[1]},
	fogSetDensity:		{Density:[1]},
	fogSetEnd:		{End:[1]},
	fogSetStart:		{Start:[1]},
	fogSetType:		{Type:[2]},
	loadBackground:		{Path:[2]},
//	playBgLightAnim:	{EffectName:[2]},
	setDefaultMusic:	{Folder:[2],TrackName:[2]},
	setDustCloudAmbient:	{AmbientColor:[1,1,1]},
	setFXWind:		{Vector:[1,1,1]},
	setGlareIntensity:	{Intensity:[1]},
	setLevelShadowColour:	{R:[1],G:[1],B:[1],A:[1]},
//	setLightColour:		{LightName:[2],Diffuse:[1,1,1,1]},
//	setLightSpecular:	{LightName:[2],Specular:[1,1,1,1]},
//	setMaxCameraDistance:	{?, ...},
//	setMusicPath:		{Path:[2]},
	setNebulaAmbient:	{AmbientColor:[1,1,1,1]},
	setSensorsManagerCameraDistances:	{MinDistance:[1],MaxDistance:[1]},
//	setSensorsThreshold:	{?, ...},
//	setUseLighting:		{Enable:[3]},
	randomMusic:		{Mode:[3]},
	randomBackground:	{Mode:[3]}
}

var levelsettingshelptable =
{
	setWorldBoundsInner:	{Position:['Float: The x-coordinate.','Float: The y-coordinate.','Float: The z-coordinate.'],Size:['Float: The size, measured along the x-axis.','Float: The size, measured along the y-axis.','Float: The size, measured along the z-axis.']},
	setWorldBoundsOuter:	{Position:['Float: The x-coordinate.','Float: The y-coordinate.','Float: The z-coordinate.'],Size:['Float: The size, measured along the x-axis.','Float: The size, measured along the y-axis.','Float: The size, measured along the z-axis.']},
	fogAddInterpolator:	{Buffer:['String: can be "fogStart", "fogEnd", "fogDensity", "fogR", "fogG" or "fogB".'],Length:['Float: duration of the event.'], Target:['Float: final value of the modified parameter.']},
	fogSetActive:		{Enable:['Boolian:Enable (1) or disable (0) fog entirely.']},
	fogSetColour:		{R:['Float: between 0 and 1.'],G:['Float: between 0 and 1.'],B:['Float: between 0 and 1.'],A:['Float: between 0 and 1.']},
	fogSetDensity:		{Density:['Float: between 0 and 1.']},
	fogSetEnd:		{End:['Float: distance.']},
	fogSetStart:		{Start:['Float: distance']},
	fogSetType:		{Type:['String: either "linear", "exp" or "exp2".']},
	loadBackground:		{Path:['String: the name of the background file to load.']},
//	playBgLightAnim:	{EffectName:['String: the name of the effect to play']},
	setDefaultMusic:	{Folder:['String: the folder the audio track is stored in (e.g., "ambient" or "battle").'], TrackName:['String: the name of the audio track (e.g., "amb_03" or "battle_04").']},
	setDustCloudAmbient:	{AmbientColor:['Float: between 0 and 1.','Float: between 0 and 1.','Float: between 0 and 1.','Float: between 0 and 1.']},
	setFXWind:		{Vector:['Float: the X component.','Float: the Y component.','Float: the Z component.']},
	setGlareIntensity:	{Intensity:['Float: between 0 and 1.']},
	setLevelShadowColour:	{R:['Float: between 0 and 1.'],G:['Float: between 0 and 1.'],B:['Float: between 0 and 1.'],A:['Float: between 0 and 1.']},
//	setLightColour:		{LightName:['String: the name of the light.'],Diffuse:['Float: between 0 and 1.','Float: between 0 and 1.','Float: between 0 and 1.','Float: between 0 and 1.']},
//	setLightSpecular:	{LightName:['String: the name of the light.'],Specular:['Float: between 0 and 1.','Float: between 0 and 1.','Float: between 0 and 1.','Float: between 0 and 1.']},
//	setMaxCameraDistance:	{?, ...},
//	setMusicPath:		{Path:['String: the pathname that Music patches will try to use when playing music.']},
	setNebulaAmbient:	{AmbientColor:['Float: between 0 and 1.','Float: between 0 and 1.','Float: between 0 and 1.','Float: between 0 and 1.']},
	setSensorsManagerCameraDistances:	{MinDistance:['Float: mininum distance between focal point and camera when zooming in.'], MaxDistance:['Float: mininum distance between focal point and camera when zooming out.']},
//	setSensorsThreshold:	{?, ...},
//	setUseLighting:		{Enable:['Boolian:']},
	randomMusic:		{Mode:['Integer: see "Help".']},
	randomBackground:	{Mode:['Integer: see "Help".']}
}

var defaultlevelsettingstable =
{
	setWorldBoundsInner:	{Position:[0,0,0],Size:[100000,100000,100000]},
	setWorldBoundsOuter:	{Position:[0,0,0],Size:[100000,100000,100000]},
	fogAddInterpolator:	{Buffer:['fogStart'],Length:[1],Target:[1]},
	fogSetActive:		{Enable:[0]},
	fogSetColour:		{R:[0.427734],G:[0.228516],B:[0.136719],A:[1]},
	fogSetDensity:		{Density:[0.15]},
	fogSetEnd:		{End:[20000]},
	fogSetStart:		{Start:[10]},
	fogSetType:		{Type:['linear']},
	loadBackground:		{Path:['m01']},
//	playBgLightAnim:	{EffectName:['My Effect']},
	setDefaultMusic:	{Folder:['battle'],TrackName:['battle_01']},
	setDustCloudAmbient:	{AmbientColor:[0.5,0.5,0.5,1]},
	setFXWind:		{Vector:[1,1,1]},
	setGlareIntensity:	{Intensity:[0]},
	setLevelShadowColour:	{R:[0],G:[0],B:[0],A:[1]},
//	setLightColour:		{LightName:['My Light'],Diffuse:[1,1,1,1]},
//	setLightSpecular:	{LightName:['My Light'],Specular:[1,1,1,1]},
//	setMaxCameraDistance:	{?,...},
//	setMusicPath:		{Path:[2]},
	setNebulaAmbient:	{AmbientColor:[0.5,0.5,0.5,1]},
	setSensorsManagerCameraDistances:	{MinDistance:[1000],MaxDistance:[100000]},
//	setSensorsThreshold:	{?,...},
//	setUseLighting:		{Enable:[0]},
	randomMusic:		{Mode:[0]},
	randomBackground:	{Mode:[0]}
}

var reservedwords =
[
//MissionDude
'tableorder',
//lua 4.0
'and','break','do','else','elseif','end','false','for','function','if','in','local','nil','not','or','repeat','return','then','true','until','while',
//lua 4.0
//'_VERSION','assert','collectgarbage','dofile','error','gcinfo','loadfile','loadstring','print','rawget','rawset','require','tonumber','tostring','type','unpack','_ALERT','_ERRORMESSAGE','_INPUT','_PROMPT','_OUTPUT','_STDERR','_STDIN','_STDOUT','call','dostring','foreach','foreachi','getn','globals','newtype','sort','tinsert','tremove','abs','acos','asin','atan','atan2','ceil','cos','deg','exp','floor','format','frexp','gsub','ldexp','log','log10','max','min','mod','rad','random','randomseed','sin','sqrt','strbyte','strchar','strfind','strlen','strlower','strrep','strsub','strupper','tan','openfile','closefile','readfrom','writeto','appendto','remove','rename','flush','seek','tmpfile','tmpname','read','write','clock','date','difftime','execute','exit','getenv','setlocale','time','break','delete','function','return','typeof',
//jscript
'case','do','if','switch','var','catch','else','in','this','void','continue','false','instanceof','throw','while','debugger','finally','new','true','with','default','for','null','try',
//future jscript
//'abstract','double','goto','native','static','boolean','enum','implements','package','super','byte','export','import','private','synchronized','char','extends','int','protected','throws','class','final','interface','public','transient','const','float','long','short','volatile',
//jscript
//'ActiveXObject','Array','Boolean','Date','Dictionary','Enumerator','Error','FileSystemObject','Function','Global','Math','Number','Object','RegExp','String','VBArray',
//jscript
//'GetObject','ScriptEngine','ScriptEngineBuildVersion','ScriptEngineMajorVersion','ScriptEngineMinorVersion',
//WSH
//'WScript'
''
]

var defaultlevelauthor = 'Author', defaultlevelcomments = '', defaultleveldescription = 'New Level'
var DefaultAppSettings = {draganddrop : 1, dropshadow : 1, mapfontscale : 1, viewruler : 1, viewgrid : 1, viewaxes : 1, mapzoom : 1, mapwidth : 720, mapheight : 540, scaleonzoom : 1, lvlfolderpath : '.\\maps\\', mapfolderpath : '.\\maps\\', stylesheet : 'Default', gridsize : 1000, snaptogrid : 0, imagetop : 10000, imageleft : 10000, imageheight : 20000, imagewidth : 20000, jitterx : 5000, jittery : 5000, jitterz : 5000}
