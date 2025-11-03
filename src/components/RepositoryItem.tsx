import React, { memo } from 'react';
import {
  Card,
  CardContent,
  Box,
  Link,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Repository } from '../types';
import { LazyImage } from './LazyImage';

interface RepositoryItemProps {
  repo: Repository;
  index: number;
}

const RepositoryItemComponent: React.FC<RepositoryItemProps> = ({ repo, index }) => {
  return (
    <Card
      sx={{
        marginBottom: '12px',
        background: '#161b22',
        border: '1px solid #30363d',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#58a6ff',
          boxShadow: '0 4px 12px rgba(88, 166, 255, 0.15)',
        },
      }}
    >
      <CardContent sx={{ padding: '16px', '&:last-child': { paddingBottom: '16px' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Link
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#58a6ff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {repo.name}
            </Link>

            <Typography
              variant="body2"
              sx={{
                color: '#8b949e',
                marginTop: '4px',
              }}
            >
              {repo.full_name}
            </Typography>

            {repo.description && (
              <Typography
                variant="body2"
                sx={{
                  color: '#e6edf3',
                  marginTop: '8px',
                  lineHeight: 1.5,
                }}
              >
                {repo.description}
              </Typography>
            )}

            <Stack direction="row" spacing={1} sx={{ marginTop: '12px', flexWrap: 'wrap' }}>
              <Chip
                label={`#${index + 1}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#30363d',
                  color: '#8b949e',
                }}
              />
              {repo.language && (
                <Chip
                  label={repo.language}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: '#30363d',
                    color: '#8b949e',
                  }}
                />
              )}
              <Chip
                icon={<StarIcon />}
                label={repo.stars}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#fb8500',
                  color: '#fb8500',
                }}
              />
            </Stack>
          </Box>

          <Link
            href={repo.owner.profile_url}
            target="_blank"
            rel="noopener noreferrer"
            title={repo.owner.login}
            sx={{
              marginLeft: '12px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              border: '2px solid #30363d',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease',
              '&:hover': {
                borderColor: '#58a6ff',
              },
            }}
          >
            <LazyImage src={repo.owner.avatar_url} alt={repo.owner.login} width={48} height={48} />
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export const RepositoryItem = memo(RepositoryItemComponent);
