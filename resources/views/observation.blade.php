<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .report-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;

    }
    .reportHeader {
      text-align: center;
    }
    .report-container table {
      width: 100%;
    }
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
  </style>
</head>
<body>
  <div class="report-container">
    <div class="reportHeader">
      <h3>{{ $manufacturer->Name }}</h3>
      <h3>{{ $protocolStudy->studyType->StudyName }}</h3>
      <h4>Product name: {{ $product->ProductName }}, {{ $sampleBatch->variant->Variant }}</h4>
      <h4>Storage condition: {{ $protocolStudy->condition->Condition }}</h4>
    </div>
    <table>
      <thead>
        <tr>
          <th>Tests</th>
          <th>Specifications</th>
          @foreach ($months as $month)
            <th>{{ $month }}</th>    
          @endforeach
        </tr>
      </thead>
      <tbody>
        @foreach ($formattedResult as $test)
            <tr>
              <td @if(isset($test->SubTests) && $test->SubTests->count() > 0) colspan="{{ count($months)+2 }}" @endif>
                {{ $test->Name }}
              </td>
              @if(!isset($test->SubTests) || $test->SubTests->count() < 1)
                <td>{{ $test->Specifications }}</td>
                @foreach($months as $month)
                  @if($test->IsMinMax) 
                    <td>
                      <div>
                        Min : {{$test->Months->{$month}['Min'] ?? "N/A"}}
                      </div>
                      <div>
                        Avg : {{$test->Months->{$month}['Avg'] ?? "N/A"}}
                      </div>
                      <div>
                        Max : {{$test->Months->{$month}['Max'] ?? "N/A"}}
                      </div>
                    </td>
                  @else
                    <td>{{ $test->Months->{$month}['Value'] ?? "N/A" }}</td>
                  @endif  
                @endforeach
              @endif
            </tr>  
            @if(isset($test->SubTests) && $test->SubTests->count() > 0)
              @foreach ($test->SubTests as $subTest)
                  <tr>
                    <td>{{ $subTest->Name }}</td>
                    <td>{{ $subTest->Specifications }}</td>
                    @foreach($months as $month)
                      @if($subTest->IsMinMax) 
                        <td>
                          <div>
                            Min : {{$subTest->Months->{$month}['Min'] ?? "N/A"}}
                          </div>
                          <div>
                            Avg : {{$subTest->Months->{$month}['Avg'] ?? "N/A"}}
                          </div>
                          <div>
                            Max : {{$subTest->Months->{$month}['Max'] ?? "N/A"}}
                          </div>
                        </td>
                      @else
                        <td>{{ $subTest->Months->{$month}['Value'] ?? "N/A" }}</td>
                      @endif
                    @endforeach
                  </tr>
              @endforeach
            @endif
        @endforeach
      </tbody>
    </table>
  </div>
</body>
</html>