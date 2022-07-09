#!/usr/bin/env bash

progname="$(basename $0)"

[ -z "${TAVLI_BASEDIR}" ] &&
TAVLI_BASEDIR="/var/opt/tavli"

[ -d "${TAVLI_BASEDIR}" ] || {
	echo "${progname}: ${TAVLI_BASEDIR}: directory not found" >&2
	exit 2
}

lockdir="${TAVLI_BASEDIR}/skiser/lock"

[ -d "${lockdir}" ] || {
	echo "${progname}: ${lockdir}: directory not found" >&2
	exit 2
}

usage() {
	echo "usage: ${progname} { status | start | stop | restart }" >&2
	exit 1
}

errs=

while getopts ":" opt
do
	case "${opt}" in
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

shift $(expr ${OPTIND} - 1)
[ $# -ne 1 ] && usage

skiser_status() {
	echo "STATUS"
}

case "${1}" in
status)
	skiser_status
	;;
start)
	skiser_start
	;;
stop)
	skiser_stop
	;;
restart)
	skiser_stop && skiser_start
	;;
*)
	usage
	;;
esac
