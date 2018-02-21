build:
	@docker build -t nightmare .

run:
	@docker run -it -v $(PWD)/index.js:/index.js nightmare node index.js

run.debug:
	@docker run -it -v $(PWD)/index.js:/index.js -e DEBUG=nightmare* nightmare node index.js