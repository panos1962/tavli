#!/usr/bin/env bash

progname="$(basename $0)"

usage() {
	echo "usage: ${progname}" >&2
	exit 1
}

errs=

while getopts ":sL" opt
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

[ -z "${TAVLI_BASEDIR}" ] &&
TAVLI_BASEDIR="/var/opt/tavli"

export TAVLI_BASEDIR

dbconf="${TAVLI_BASEDIR}/local/db.cf"

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
export MYSQL_PWD="${3}"

datadir="${TAVLI_BASEDIR}/database/sample"

[ -d "${datadir}" ] || {
	echo "${progname}: ${datadir}: directory not found" >&2
	exit 2
}

[ -r "${datadir}" ] || {
	echo "${progname}: ${datadir}: cannot read directory" >&2
	exit 2
}

for table in pektis
do
	datafile="${datadir}/${table}.sql"

	[ -f "${datafile}" ] || {
		echo "${progname}: ${datafile}: file not found" >&2
		continue
	}

	[ -r "${datafile}" ] || {
		echo "${progname}: ${datafile}: cannot read file" >&2
		continue
	}

	mysql -u "${dbuser}" "${dbname}" <"${datafile}"
done
