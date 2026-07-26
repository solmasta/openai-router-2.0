start:
	./router start

stop:
	./router stop

restart:
	./router restart

doctor:
	./scripts/doctor.sh

backup:
	./scripts/backup.sh

build:
	pnpm --filter web build
