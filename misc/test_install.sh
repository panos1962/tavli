#!/usr/bin/env bash

progname="$(basename $0)"

[ -z "${TAVLI_BASEDIR}" ] &&
TAVLI_BASEDIR="/var/opt/tavli"

[ -d "${TAVLI_BASEDIR}" ] || {
	echo "${progname}: ${TAVLI_BASEDIR}: directory not found" >&2
	exit 2
}

[ -r "${TAVLI_BASEDIR}" ] || {
	echo "${progname}: ${TAVLI_BASEDIR}: npo permission" >&2
	exit 2
}

usage() {
	echo "usage: ${progname}" >&2
	exit 1
}

errs=

while getopts ":" opt
do
	case "${opt}" in
	\:)
		echo "${progname}: -${OPTARG}: option rquires an argument" >&2
		errs=1
		;;
	\?)
		echo "${progname}: -${OPTARG}: invalid option" >&2
		errs=1
		;;
	esac
done

[ -n "${errs}" ] && usage

shift $(expr $OPTIND - 1)
[ $# -ne 0 ] && usage

"${TAVLI_BASEDIR}/database/ddload.sh" -L
"${TAVLI_BASEDIR}/database/dbload.sh"
