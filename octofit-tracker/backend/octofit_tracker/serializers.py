from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class SimpleTeamSerializer(serializers.ModelSerializer):
    """Simplified team serializer to avoid circular references"""
    id = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name']

    def get_id(self, obj):
        return str(obj.pk)


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    teams = SimpleTeamSerializer(many=True, read_only=True)
    team_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Team.objects.all(), 
        source='teams', 
        write_only=True,
        required=False
    )

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'age', 'teams', 'team_ids']

    def get_id(self, obj):
        return str(obj.pk)


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members']

    def get_id(self, obj):
        return str(obj.pk)


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'activity_type', 'duration', 'date']

    def get_id(self, obj):
        return str(obj.pk)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'user_id', 'score']

    def get_id(self, obj):
        return str(obj.pk)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'duration']

    def get_id(self, obj):
        return str(obj.pk)
