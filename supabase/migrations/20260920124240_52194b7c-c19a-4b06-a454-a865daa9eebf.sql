CREATE TABLE public.solicitudes_presupuesto (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  contacto TEXT NOT NULL,
  tipo_proyecto TEXT NOT NULL,
  material TEXT,
  mensaje TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'nueva',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.solicitudes_presupuesto TO anon;
GRANT ALL ON public.solicitudes_presupuesto TO service_role;

ALTER TABLE public.solicitudes_presupuesto ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede enviar una solicitud" ON public.solicitudes_presupuesto FOR INSERT TO anon WITH CHECK (true);