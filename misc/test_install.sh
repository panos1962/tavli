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
	echo "usage: ${progname} [-m]" >&2
	exit 1
}

monmsg() {
	[ -n "${monitor}" ] || return 0
	[ -w "/dev/tty" ] || return 0
	echo "$@" >"/dev/tty"
}

errs=

if [ -w "/dev/tty" ]; then
	monitor="yes"
else
	monitor=
fi
monopt=

while getopts ":m" opt
do
	case "${opt}" in
	m)
		monitor=
		monopt="-m"
		;;
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

monmsg "Database will be deleted!!!
A new test database will be created.
You will be asked for database root password"
"${TAVLI_BASEDIR}/database/ddload.sh" -Ls || exit 2

monmsg "Test database has been created successfully!
Loading test data…"
"${TAVLI_BASEDIR}/database/dbload.sh" ${monopt} || exit 2

monmsg "Test data has been loaded successfully!"
