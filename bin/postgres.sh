
#!/bin/bash

sudo -u postgres -H -- psql -d prestamo -c "
DELETE FROM public.\"ROLS\";
INSERT INTO public.\"ROLS\" (name, description) VALUES ('customer', 'can have acces to api customers'),
('seller', 'can have acces to api seller'), ('admin', 'can have acces all api');


