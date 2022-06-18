#!/usr/bin/env bash

progname="$(basename $0)"

usage() {
	echo "usage: ${progname} [-s] [-L]" >&2
	exit 1
}

errs=
silent=
post="cat"

while getopts ":sL" opt
do
	case "${opt}" in
	s)
		silent="yes"
		;;
	L)
		post="mysql -u root -p"
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

[ -z "${TAVLI_BASEDIR}" ] &&
TAVLI_BASEDIR="/var/opt/tavli"

export TAVLI_BASEDIR

dbconf="${TAVLI_BASEDIR}/local/conf.cf"

[ -r "${dbconf}" ] || {
	echo "${progname}: ${dbconf}: cannot read"
	exit 2
}

eval set -- $(jq '.dbname,.dbuser,.dbpass' "${dbconf}")

[ $# -ne  3 ] && {
	echo "${progname}: ${dbconf}: syntax error" >&2
	exit 2
}

dbname="${1}"
dbuser="${2}"
dbpass="${3}"

schema="${TAVLI_BASEDIR}/database/schema.sql"

[ -r "${schema}" ] || {
	echo "${progname}: ${schema}: cannot read"
	exit 2
}

sed "s__SILENT__${silent}g
s__DATABASE__${dbname}g
s__DBUSER__${dbuser}g
s__DBPASS__${dbpass}g" "${schema}" | ${post}
