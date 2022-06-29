"use strict";

service.fereSkiniko = function(nodereq) {
	if (nodereq.isvoli())
	return;

	if (nodereq.denPerastike('id', 'ακαθόριστο id σε αίτημα "fereSkiniko"'))
	return;

	let sinedria = nodereq.sinedria;

	nodereq.write(skiniko);
	nodereq.end('END');

/*
	feredataPollSet().
	feredataObsolete().
	feredataSet(nodereq).
	feredataFreska();
*/
};

