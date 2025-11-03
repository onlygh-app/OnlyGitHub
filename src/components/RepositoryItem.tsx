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
        marginBottom: '10px',
        background: '#161b22',
        border: '1px solid #30363d',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#58a6ff',
          boxShadow: '0 4px 12px rgba(88, 166, 255, 0.15)',
        },
      }}
    >
      <CardContent sx={{ padding: '12px 14px', '&:last-child': { paddingBottom: '12px' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Link
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#58a6ff',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {repo.name}
            </Link>

            <Typography
              variant="caption"
              sx={{
                color: '#8b949e',
                marginTop: '2px',
                display: 'block',
                fontSize: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {repo.full_name}
            </Typography>

            {repo.description && (
              <Typography
                variant="caption"
                sx={{
                  color: '#e6edf3',
                  marginTop: '4px',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontSize: '12px',
                }}
              >
                {repo.description}
              </Typography>
            )}

            <Stack direction="row" spacing={0.5} sx={{ marginTop: '6px', flexWrap: 'wrap', gap: '4px' }}>
              <Chip
                label={`#${index + 1}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#30363d',
                  color: '#8b949e',
                  height: '20px',
                  fontSize: '11px',
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
                    height: '20px',
                    fontSize: '11px',
                  }}
                />
              )}
              <Chip
                icon={<StarIcon sx={{ fontSize: '14px !important' }} />}
                label={repo.stars}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#fb8500',
                  color: '#fb8500',
                  height: '20px',
                  fontSize: '11px',
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
              marginLeft: '8px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              border: '2px solid #30363d',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease',
              flexShrink: 0,
              '&:hover': {
                borderColor: '#58a6ff',
              },
            }}
          >
            <LazyImage src={repo.owner.avatar_url} alt={repo.owner.login} width={40} height={40} />
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export const RepositoryItem = memo(RepositoryItemComponent);
