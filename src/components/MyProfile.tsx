import React, { memo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Stack,
  Link,
  Divider,
  useTheme,
} from '@mui/material';
import { User } from '../types';

interface MyProfileProps {
  user: User;
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString || dateString.trim() === '') return 'Not available';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Not available';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const MyProfileComponent: React.FC<MyProfileProps> = ({ user }) => {
  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          marginBottom: 2,
          borderRadius: 1,
        }}
        elevation={0}
      >
        <CardContent>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
            <Avatar
              src={user.avatar_url}
              sx={{
                width: 120,
                height: 120,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 0.5 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {user.name || user.login}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: 1.5 }}
              >
                @{user.login}
              </Typography>

              {user.bio && (
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 1.5 }}
                >
                  {user.bio}
                </Typography>
              )}

              <Grid container spacing={2} sx={{ marginTop: 1 }}>
                {user.location && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {user.location}
                    </Typography>
                  </Grid>
                )}
                {user.company && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">
                      Company
                    </Typography>
                    <Typography variant="body2">
                      {user.company}
                    </Typography>
                  </Grid>
                )}
                {user.email && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">
                      Email
                    </Typography>
                    <Link
                      href={`mailto:${user.email}`}
                      variant="body2"
                      sx={{
                        display: 'block',
                        color: theme.palette.primary.main,
                      }}
                    >
                      {user.email}
                    </Link>
                  </Grid>
                )}
                {user.blog && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">
                      Blog
                    </Typography>
                    <Link
                      href={user.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      sx={{
                        display: 'block',
                        color: theme.palette.primary.main,
                      }}
                    >
                      {user.blog}
                    </Link>
                  </Grid>
                )}
                {user.twitter_username && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">
                      Twitter
                    </Typography>
                    <Link
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      sx={{
                        display: 'block',
                        color: theme.palette.primary.main,
                      }}
                    >
                      @{user.twitter_username}
                    </Link>
                  </Grid>
                )}
              </Grid>

              <Divider sx={{ marginY: 2 }} />

              <Stack direction="row" spacing={3} sx={{ marginTop: 1 }}>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Repositories
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.public_repos}
                  </Typography>
                  {user.private_repos && user.private_repos > 0 && (
                    <Typography variant="caption" color="textSecondary" sx={{ fontSize: '10px' }}>
                      {user.private_repos} private
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Followers
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.followers}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Following
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.following}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Gists
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.public_gists}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          marginBottom: 2,
          borderRadius: 1,
        }}
        elevation={0}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">
                Created At
              </Typography>
              <Typography variant="body2">
                {formatDate(user.created_at)}
              </Typography>
            </Grid>
            {user.updated_at && (
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">
                  Updated At
                </Typography>
                <Typography variant="body2">
                  {formatDate(user.updated_at)}
                </Typography>
              </Grid>
            )}
            {user.disk_usage && (
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">
                  Disk Usage
                </Typography>
                <Typography variant="body2">
                  {formatBytes(user.disk_usage)}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">
                Profile URL
              </Typography>
              <Link
                href={user.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                sx={{
                  display: 'block',
                  color: theme.palette.primary.main,
                }}
              >
                {user.profile_url}
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export const MyProfile = memo(MyProfileComponent);
