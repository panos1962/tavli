#!/usr/bin/env bash

progname="$(basename $0)"

usage() {
	echo "usage: ${progname} [-s]" >&2
	exit 1
}

errs=
silent=

while getopts ":sL" opt
do
	case "${opt}" in
	s)
		silent="yes"
		;;
	\:)
		echo "${progname}: -${OPTARG}: option requires an argument" >&2
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

[ -z "${TAVLI_BASEDIR}" ] &&
TAVLI_BASEDIR="/var/opt/tavli"

export TAVLI_BASEDIR

"${TAVLI_BASEDIR}/database/ddload.sh" -L &&
"${TAVLI_BASEDIR}/database/dbload.sh"
