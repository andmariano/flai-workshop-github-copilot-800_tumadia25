from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
import datetime


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')
        users_data = [
            {'email': 'ironman@avengers.com', 'name': 'Tony Stark', 'age': 48},
            {'email': 'spiderman@avengers.com', 'name': 'Peter Parker', 'age': 22},
            {'email': 'blackwidow@avengers.com', 'name': 'Natasha Romanoff', 'age': 38},
            {'email': 'thor@avengers.com', 'name': 'Thor Odinson', 'age': 1500},
            {'email': 'batman@dc.com', 'name': 'Bruce Wayne', 'age': 40},
            {'email': 'superman@dc.com', 'name': 'Clark Kent', 'age': 35},
            {'email': 'wonderwoman@dc.com', 'name': 'Diana Prince', 'age': 800},
            {'email': 'theflash@dc.com', 'name': 'Barry Allen', 'age': 28},
        ]
        users = []
        for ud in users_data:
            user = User.objects.create(**ud)
            users.append(user)
            self.stdout.write(f'  Created user: {user.name}')

        marvel_users = [u for u in users if u.email.endswith('@avengers.com')]
        dc_users = [u for u in users if u.email.endswith('@dc.com')]

        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(name='Team Marvel')
        team_marvel.members.set(marvel_users)

        team_dc = Team.objects.create(name='Team DC')
        team_dc.members.set(dc_users)

        self.stdout.write('Creating activities...')
        activities_data = [
            {'user': users[0], 'activity_type': 'Running', 'duration': 45.0, 'date': datetime.date(2024, 1, 10)},
            {'user': users[1], 'activity_type': 'Cycling', 'duration': 60.0, 'date': datetime.date(2024, 1, 11)},
            {'user': users[2], 'activity_type': 'Swimming', 'duration': 30.0, 'date': datetime.date(2024, 1, 12)},
            {'user': users[3], 'activity_type': 'Weightlifting', 'duration': 90.0, 'date': datetime.date(2024, 1, 13)},
            {'user': users[4], 'activity_type': 'Martial Arts', 'duration': 50.0, 'date': datetime.date(2024, 1, 10)},
            {'user': users[5], 'activity_type': 'Flying', 'duration': 120.0, 'date': datetime.date(2024, 1, 11)},
            {'user': users[6], 'activity_type': 'Sword Training', 'duration': 75.0, 'date': datetime.date(2024, 1, 12)},
            {'user': users[7], 'activity_type': 'Sprint', 'duration': 15.0, 'date': datetime.date(2024, 1, 13)},
        ]
        for ad in activities_data:
            activity = Activity.objects.create(**ad)
            self.stdout.write(f'  Created activity: {activity.activity_type} for {activity.user.name}')

        self.stdout.write('Creating leaderboard entries...')
        scores = [950, 800, 870, 990, 880, 920, 910, 1100]
        for user, score in zip(users, scores):
            entry = Leaderboard.objects.create(user=user, score=score)
            self.stdout.write(f'  {entry.user.name}: {entry.score}')

        self.stdout.write('Creating workouts...')
        workouts_data = [
            {
                'name': 'Iron Man Endurance',
                'description': 'A high-intensity cardio workout inspired by Tony Stark\'s suit training.',
                'duration': 60.0,
            },
            {
                'name': 'Spider Agility Drill',
                'description': 'Quick reflexes and agility drills to move like Spider-Man.',
                'duration': 30.0,
            },
            {
                'name': 'Black Widow Combat Training',
                'description': 'Martial arts and strength conditioning for peak combat readiness.',
                'duration': 45.0,
            },
            {
                'name': 'Thor Power Lift',
                'description': 'Heavy compound lifts to build superhuman strength.',
                'duration': 75.0,
            },
            {
                'name': 'Batman Night Run',
                'description': 'Long-distance night run with stealth movement exercises.',
                'duration': 60.0,
            },
            {
                'name': 'Superman Speed Circuit',
                'description': 'Sprint circuits and aerial agility moves.',
                'duration': 40.0,
            },
        ]
        for wd in workouts_data:
            workout = Workout.objects.create(**wd)
            self.stdout.write(f'  Created workout: {workout.name}')

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
