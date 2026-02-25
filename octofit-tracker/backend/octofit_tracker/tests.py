from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
import datetime


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='ironman@avengers.com', name='Tony Stark', age=48
        )

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Tony Stark')
        self.assertEqual(self.user.email, 'ironman@avengers.com')

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Tony Stark')


class TeamModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='spiderman@avengers.com', name='Peter Parker', age=22
        )
        self.team = Team.objects.create(name='Team Marvel')
        self.team.members.add(self.user)

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Team Marvel')

    def test_team_members(self):
        self.assertIn(self.user, self.team.members.all())

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Team Marvel')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='thor@avengers.com', name='Thor Odinson', age=1500
        )
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Weightlifting',
            duration=90.0,
            date=datetime.date(2024, 1, 13),
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Weightlifting')
        self.assertEqual(self.activity.duration, 90.0)

    def test_activity_str(self):
        self.assertIn('Thor Odinson', str(self.activity))


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='batman@dc.com', name='Bruce Wayne', age=40
        )
        self.entry = Leaderboard.objects.create(user=self.user, score=880)

    def test_leaderboard_score(self):
        self.assertEqual(self.entry.score, 880)

    def test_leaderboard_str(self):
        self.assertIn('Bruce Wayne', str(self.entry))


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Iron Man Endurance',
            description='High-intensity cardio workout.',
            duration=60.0,
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Iron Man Endurance')

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Iron Man Endurance')


class APIEndpointTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            email='superman@dc.com', name='Clark Kent', age=35
        )
        self.team = Team.objects.create(name='Team DC')
        self.team.members.add(self.user)
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Flying',
            duration=120.0,
            date=datetime.date(2024, 1, 11),
        )
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=920)
        self.workout = Workout.objects.create(
            name='Superman Speed Circuit',
            description='Sprint circuits and aerial agility moves.',
            duration=40.0,
        )

    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

    def test_users_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_teams_list(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_activities_list(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_leaderboard_list(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_workouts_list(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
