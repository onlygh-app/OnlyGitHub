import React, { memo } from 'react';
import {
  Card,
  CardContent,
  Box,
  Link,
  Typography,
  Chip,
  Stack,
  useTheme,
  Divider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArchiveIcon from '@mui/icons-material/Archive';
import BugReportIcon from '@mui/icons-material/BugReport';
import { Repository } from '../types';
import { LazyImage } from './LazyImage';

interface RepositoryItemProps {
  repo: Repository;
  index: number;
}

const formatDate = (dateString: string): string => {
  if (!dateString || dateString.trim() === '') return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const RepositoryItemComponent: React.FC<RepositoryItemProps> = ({ repo, index }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        marginBottom: theme.spacing(1.25),
        transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: theme.shadows[2],
        },
      }}
      elevation={0}
    >
      <CardContent sx={{ padding: theme.spacing(1.5), '&:last-child': { paddingBottom: theme.spacing(1.5) } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: theme.spacing(1) }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Link
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                fontSize: '15px',
                fontWeight: 600,
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: theme.palette.primary.main,
              }}
            >
              {repo.name}
            </Link>

            <Typography
              variant="caption"
              component="div"
              sx={{
                color: theme.palette.text.secondary,
                marginTop: theme.spacing(0.25),
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                backgroundColor: theme.palette.action.hover,
                padding: theme.spacing(0.25, 0.75),
                borderRadius: theme.spacing(0.5),
                width: 'fit-content',
              }}
            >
              {repo.full_name}
            </Typography>

            {repo.description && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.primary,
                  marginTop: theme.spacing(0.5),
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {repo.description}
              </Typography>
            )}

            <Stack 
              direction="row" 
              spacing={0.5} 
              sx={{ 
                marginTop: theme.spacing(0.75), 
                flexWrap: 'wrap', 
                gap: theme.spacing(0.5),
              }}
            >
              <Chip
                label={`#${index + 1}`}
                size="small"
                variant="outlined"
              />
              {repo.fork && (
                <Chip
                  icon={<ForkRightIcon sx={{ fontSize: '14px !important' }} />}
                  label="Fork"
                  size="small"
                  variant="outlined"
                />
              )}
              {repo.archived && (
                <Chip
                  icon={<ArchiveIcon sx={{ fontSize: '14px !important' }} />}
                  label="Archived"
                  size="small"
                  variant="outlined"
                />
              )}
              {repo.visibility && (
                <Chip
                  icon={<VisibilityIcon sx={{ fontSize: '14px !important' }} />}
                  label={repo.visibility}
                  size="small"
                  variant="outlined"
                />
              )}
              {repo.language && (
                <Chip
                  label={repo.language}
                  size="small"
                  variant="outlined"
                />
              )}
              <Chip
                icon={<StarIcon sx={{ fontSize: '14px !important' }} />}
                label={repo.stars}
                size="small"
                variant="outlined"
              />
              {repo.forks_count > 0 && (
                <Chip
                  icon={<ForkRightIcon sx={{ fontSize: '14px !important' }} />}
                  label={repo.forks_count}
                  size="small"
                  variant="outlined"
                />
              )}
              {repo.open_issues_count > 0 && (
                <Chip
                  icon={<BugReportIcon sx={{ fontSize: '14px !important' }} />}
                  label={repo.open_issues_count}
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>

            {repo.pushed_at && (
              <>
                <Divider sx={{ marginY: theme.spacing(1) }} />
                <Typography variant="caption" color="textSecondary">
                  Pushed: {formatDate(repo.pushed_at)}
                </Typography>
              </>
            )}
          </Box>

          <Link
            href={repo.owner.profile_url}
            target="_blank"
            rel="noopener noreferrer"
            title={repo.owner.login}
            sx={{
              marginLeft: theme.spacing(1),
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              border: `2px solid ${theme.palette.divider}`,
              overflow: 'hidden',
              transition: 'border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              flexShrink: 0,
              '&:hover': {
                borderColor: theme.palette.primary.main,
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
