import { Box, Card, Stack, Typography } from "@mui/material";
  
export interface LinkItemProps {
    icon: React.ReactNode;
    title: string;
    url: string;
    subtitle?: string;
}
  
export const LinkItem: React.FC<LinkItemProps & { gradientColors: string[] }> = ({ icon, title, url, gradientColors, subtitle }) => {
    const isExternal = url.startsWith('http') || url.startsWith('https');
    return (
      <Box
        sx={{
          position: 'relative',
          mb: 2.5,
          borderRadius: 3,
          padding: '2px', // Border thickness
          background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <Card
          component="a"
          href={url === '' ? undefined : url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          sx={{
            display: 'flex',
            alignItems: 'center', 
            p: 2.5,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'inherit',
            textDecoration: 'none',
            color: 'text.primary',
            border: 'none',
            m: 0,
          }}
        >
          <Box 
            sx={{ 
              mr: 2.5, 
              color: gradientColors[0],
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 45,
              height: 45,
              borderRadius: '50%',
              background: `linear-gradient(135deg, rgba(${parseInt(gradientColors[0].slice(1, 3), 16)}, ${parseInt(gradientColors[0].slice(3, 5), 16)}, ${parseInt(gradientColors[0].slice(5, 7), 16)}, 0.2), rgba(${parseInt(gradientColors[1].slice(1, 3), 16)}, ${parseInt(gradientColors[1].slice(3, 5), 16)}, ${parseInt(gradientColors[1].slice(5, 7), 16)}, 0.1))`,
              backdropFilter: 'blur(5px)',
              boxShadow: `0 0 20px rgba(${parseInt(gradientColors[0].slice(1, 3), 16)}, ${parseInt(gradientColors[0].slice(3, 5), 16)}, ${parseInt(gradientColors[0].slice(5, 7), 16)}, 0.3)`,
              '& > svg': {
                fontSize: 22,
              }
            }}
          >
            {icon}
          </Box>
          <Stack>
            <Typography variant="subtitle1" component="span" fontWeight="600" sx={{ letterSpacing: '0.02em' }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" component="span" color="text.secondary" sx={{ opacity: 0.8 }}>
                {subtitle}
              </Typography>
            )}
          </Stack>
        </Card>
      </Box>
    );
  };