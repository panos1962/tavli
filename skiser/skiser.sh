#!/usr/bin/env bash

progname="$(basename $0)"

[ -z "${TAVLI_BASEDIR}" ] &&
TAVLI_BASEDIR="/var/opt/tavli"

cd "${TAVLI_BASEDIR}" 2>/dev/null ||  {
	echo "${progname}: ${TAVLI_BASEDIR}: directory not found" >&2
	exit 2
}

usage() {
	echo "usage: ${progname} [-i] { status | start | stop | restart | cleanup }" >&2
	exit 1
}

interactive=
errs=

while getopts ":i" opt
do
	case "${opt}" in
	i)
		interactive="yes"
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

shift $(expr ${OPTIND} - 1)
[ $# -ne 1 ] && usage

lockdir="${TAVLI_BASEDIR}/skiser/skiser.lck"
pidfile="${lockdir}/skiser.pid"
logdir="${TAVLI_BASEDIR}/skiser/log"

[ -d "${logdir}" ] || mkdir "${logdir}" 2>/dev/null || {
	echo "${progname}: ${logdir}: directory not found" >&2
	exit 2
}

cleanup() {
	rm -rf "${lockdir}"
}

skiser_status() {
	[ -d "${lockdir}" ] || {
		echo "${progname}: not running"
		return 0
	}

	echo "${progname}: skiser is running"
	ps -fp "$(cat ${pidfile})"
	return $?
}

skiser_start() {
	mkdir "${lockdir}" 2>/dev/null || {
		echo "${progname}: is already running" >&2
		return 2
	}

	trap "cleanup; exit 0" 1 2 3 15

	if [ -n "${interactive}" ]; then
		node "${TAVLI_BASEDIR}/skiser/main.js"
		return $?
	fi

	nohup node "${TAVLI_BASEDIR}/skiser/main.js" \
		>"${logdir}/skiser.out" 2>"${logdir}/skiser.err" &
	echo "$!" >"${pidfile}"
	ps -fp "$!"
	return 0
}

skiser_stop() {
	[ -f "${pidfile}" ] || {
		echo "${progname}: not running" >&2
		return 2
	}

	pid="$(cat ${pidfile})"
	kill "${pid}" 2>/dev/null || {
		echo "${progname}: failed to stop server" >&2
		return 2
	}

	ps -fp "${pid}" >/dev/null 2>&1 || {
		cleanup
		return 0
	}

	echo "${progname}: server killed but not stopped" >&2
	return 2
}

skiser_restart() {
	if [ -f "${pidfile}" ]; then
		skiser_stop || return 2
	fi

	cleanup
	skiser_start
	return $?
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
	skiser_restart
	;;
cleanup)
	skiser_stop || exit 2
	rm -rf "${logdir}"/skiser.??? "${lockdir}"
	exit 0
	;;
*)
	usage
	;;
esac
