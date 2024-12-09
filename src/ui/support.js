import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import shahul from './shahul.png';
import uday from './uday.png';
import balu from './balu.png';

const teamMembers = [
  {
    name: 'Shaik Fyroz Shahul',
    designation: 'Team Lead',
    contact: '2200031100@kluniversity.in',
    avatar: shahul, // Use imported image
  },
  {
    name: 'Karna Bala Naga Venkata Satya Sai',
    designation: 'Support Specialist',
    contact: '2200030313@kluniversity.in',
    avatar: balu, // Placeholder image URL
  },
  {
    name: 'Parsa Uday Kumar',
    designation: 'Technical Support',
    contact: '2200031172@kluniversity.in',
    avatar: uday, // Placeholder image URL
  },
];

export default function Support() {
  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Support Team
      </Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    alt={member.name}
                    src={member.avatar}
                    sx={{ width: 80, height: 80, marginBottom: 2 }}
                  />
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {member.designation}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.contact}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
