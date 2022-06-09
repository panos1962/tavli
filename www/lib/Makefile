JSMINFILES = selida.min.js panel.min.js

%.min.js : %.js
	uglifyjs --verbose --output $@ $<

min: $(JSMINFILES)

cleanup:
	@rm -f $(JSMINFILES)
