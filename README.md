# automatic_fillin_prototype

Prototype for automatic filling ids in data submission form. Online demo is available at [https://nal-i5k.github.io/automatic_fillin_prototype/](https://nal-i5k.github.io/automatic_fillin_prototype/).

## How to run

There are two options:

1. directly open **index.html** in any browser
2. `npm install` and then `npm run start`

## Notes

- [request_project.html](request_project.html) is the new design of "request a new project" form.
  - You only need to fill in one of inputs (tax id or organism) and click the search. Corresponding **Genus**, **Species**, **Common name** will be automacically filled-in.
  - When clicking the search, what actually happens is that it calls [NCIB's E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25500/) and get those information from there.
- [submit_dataset.html](submit_dataset.html) is the new design of "submit a dataset" form.
