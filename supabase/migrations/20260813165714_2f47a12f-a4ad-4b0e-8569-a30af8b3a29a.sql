ALTER TABLE public.leads ADD COLUMN website TEXT;
GRANT SELECT, INSERT ON public.leads TO anon;
GRANT SELECT, INSERT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;