#!/usr/bin/env bash

progname="$(basename $0)"

[ -z "${TAVLI_BASEDIR}" ] &&
TAVLI_BASEDIR="/var/opt/tavli"

cd "${TAVLI_BASEDIR}" 2>/dev/null ||  {
	echo "${progname}: ${TAVLI_BASEDIR}: directory not found" >&2
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

lockdir="${TAVLI_BASEDIR}/skiser/skiser.lck"
pidfile="${lockdir}/skiser.pid"
logdir="${TAVLI_BASEDIR}/skiser/log"

[ -d "${logdir}" ] || {
	echo "${progname}: ${logdir}: directory not found" >&2
	exit 2
}

skiser_status() {
	[ -d "${lockdir}" ] || {
		echo "${progname}: not running"
		exit 0
	}

	echo "${progname}: skiser is running"
	ps -fp "$(cat ${pidfile})"
	exit 0
}

skiser_start() {
	mkdir "${lockdir}" 2>/dev/null || {
		echo "${progname}: is already running" >&2
		exit 2
	}

	nohup node "${TAVLI_BASEDIR}/skiser/main.js" \
		>"${logdir}/skiser.out" 2>"${logdir}/skiser.err" &
	echo "$!" >"${pidfile}"
	ps -fp "$!"
	exit 0
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
