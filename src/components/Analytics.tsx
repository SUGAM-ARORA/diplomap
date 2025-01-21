import { Card, Title, BarChart, DonutChart, AreaChart } from '@tremor/react';
import { useConflictStore } from '../store/useConflictStore';

export function Analytics() {
  const { conflicts } = useConflictStore();

  const casualtyData = conflicts.map(conflict => ({
    name: conflict.name,
    'Civilian Casualties': conflict.casualties.civilian,
    'Military Casualties': conflict.casualties.military
  }));

  const intensityData = conflicts.reduce((acc, conflict) => {
    acc[conflict.intensity] = (acc[conflict.intensity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(intensityData).map(([intensity, count]) => ({
    name: intensity.toUpperCase(),
    value: count
  }));

  const timelineData = conflicts.map(conflict => ({
    date: conflict.startDate,
    casualties: conflict.casualties.total
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6 p-6">
      <Card>
        <Title>Casualties by Conflict</Title>
        <BarChart
          data={casualtyData}
          index="name"
          categories={['Civilian Casualties', 'Military Casualties']}
          colors={['red', 'blue']}
          className="h-72 mt-4"
        />
      </Card>

      <Card>
        <Title>Conflicts by Intensity</Title>
        <DonutChart
          data={typeData}
          category="value"
          index="name"
          colors={['red', 'orange', 'yellow', 'blue']}
          className="h-72 mt-4"
        />
      </Card>

      <Card>
        <Title>Casualties Timeline</Title>
        <AreaChart
          data={timelineData}
          index="date"
          categories={['casualties']}
          colors={['red']}
          className="h-72 mt-4"
        />
      </Card>
    </div>
  );
}