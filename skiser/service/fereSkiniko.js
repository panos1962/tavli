"use strict";

service.fereSkiniko = function(nodereq) {
	if (nodereq.isvoli())
	return;

	if (nodereq.denPerastike('id', 'ακαθόριστο id σε αίτημα feredata'))
	return;

	/*
	if (service.feredata.freskaIpervasi(nodereq))
	return;
	*/

	nodereq.sinedriaGet().
	feredataPollSet().
	feredataObsolete().
	feredataSet(nodereq).
	feredataFreska();
};

